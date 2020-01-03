const { RichEmbed } = require('discord.js')
const { writeFile } = require("fs");
const dir = '../../s_settings.json'

module.exports.run = async (bot, msg) => {
    let { config } = bot;
    let { args } = msg;
    let s_settings = require(dir);

    switch(args[0]){
        case "mte":
        case "messagetoembed":
        case "messagetoembedchannel":
        case "msgtoembchannel":
        case "mtechannel":
            if(!msg.mentions.channels.first()){
                msg.channel.send("You have to tag a channel!")
                return;
            }
            switch(args[1]){

                case "add":
                    var channelid = msg.mentions.channels.first().id;
                    if(s_settings[msg.guild.id]){
                        if(s_settings[msg.guild.id].mtechannel){
                            if(!s_settings[msg.guild.id].mtechannel.includes(channelid)){
                                s_settings[msg.guild.id] = {
                                    mtechannel: [...s_settings[msg.guild.id].mtechannel,channelid],
                                };
                            }
                        }
                    }else{
                        s_settings[msg.guild.id] = {
                            mtechannel: [channelid],
                        }; 
                    }
                    writeFile('./s_settings.json', JSON.stringify(s_settings, null, 4), err => {
                        if(err) throw err;
                        msg.channel.send("Added! :ok_hand:")
                    });
                    break;

                case "remove":
                case "delete":
                    var channelid = msg.mentions.channels.first().id;
                    var rest = s_settings[msg.guild.id].mtechannel.filter(function(number) {
                        return number != channelid;
                    });
                    s_settings[msg.guild.id] = {
                        mtechannel: rest,
                    };
                    writeFile('./s_settings.json', JSON.stringify(s_settings, null, 4), err => {
                        if(err) throw err;
                        msg.channel.send("Removed! :ok_hand:")
                    });
                    break;

                default:
                    msg.channel.send("You have to define an action (add | remove)")
            }
            break
        case "ic":
        case "istantcommands":
        case "istantcommand":
            if(!msg.mentions.channels.first()){
                msg.channel.send("You have to tag a channel!")
                return;
            }

            let command = args[2];
            let cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

            if(!cmd){
                msg.channel.send(`Command \`${args[2]}\` not found`)
            }

            if(!cmd.usage){
                msg.channel.send(`Command \`${args[2]}\` doesn't have any usage`)
            }

            switch(args[1]){
                case "add":
                    var channelid = msg.mentions.channels.first().id;
                    if(s_settings[msg.guild.id]){
                        if(s_settings[msg.guild.id].ic){
                            if(!s_settings[msg.guild.id].ic.includes(channelid)){
                                s_settings[msg.guild.id] = {
                                    ic: [...s_settings[msg.guild.id].ic,channelid],
                                };
                            }
                        }
                    }else{
                        s_settings[msg.guild.id] = {
                            ic: [channelid],
                        }; 
                    }
                    writeFile('./s_settings.json', JSON.stringify(s_settings, null, 4), err => {
                        if(err) throw err;
                        msg.channel.send("Added! :ok_hand:")
                    });
                    break;

                case "remove":
                case "delete":
                    var channelid = msg.mentions.channels.first().id;
                    var rest = s_settings[msg.guild.id].ic.filter(function(number) {
                        return number != channelid;
                    });
                    s_settings[msg.guild.id] = {
                        ic: rest,
                    };
                    writeFile('./s_settings.json', JSON.stringify(s_settings, null, 4), err => {
                        if(err) throw err;
                        msg.channel.send("Removed! :ok_hand:")
                    });
                    break;

                default:
                    msg.channel.send("You have to define an action (add | remove)")
            }
            break
        default:
            let cEmbed = new RichEmbed()
                .setTitle("Server Settings Help Page!")
                .setDescription(`Here you can set some weird stuff, which you can't do anywhere else!`)
                .addBlankField()
                .addField(`Message to Embed feature [mte]`,`\`${config.prefix}serversettings mte add/remove #channel\``)
                .addField(`Istant Commands feature [ic]`,`\`${config.prefix}serversettings ic add/remove <command> #channel\``);
            msg.channel.send(cEmbed);
        break
    }
}

module.exports.config = {
    name: "serversettings",
	description: "You can edit any serversettings!",
    usage: `<feature> <depends from feature>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["ss","serversetting","servset","serverset","serversets"],
    perms: ['MANAGE_MESSAGES']
}