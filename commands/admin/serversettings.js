const { RichEmbed } = require('discord.js')
const { writeFile } = require("fs");
const dir = '../../s_settings.json'

module.exports.run = async (bot, msg, args, config) => {
    if( !msg.member.hasPermission(["MANAGE_MESSAGES"]) &&
    !msg.member.hasPermission(["ADMINISTRATOR"]) && !(msg.member.id == config.owner)){
        msg.channel.send("You can't use this command!");
        return;
    }

    switch(args[0]){
        case "mte":
        case "messagetoembed":
        case "messagetoembedchannel":
        case "msgtoembchannel":
        case "mtechannel":

            switch(args[1]){

                case "add":
                    var mte = require(dir);
                    if(!msg.mentions.channels.first()){
                        msg.channel.send("You have to tag a channel!")
                        return;
                    }else{
                        var channelid = msg.mentions.channels.first().id;

                        if(!mte[msg.guild.id].mtechannel.includes(channelid)){
                            mte[msg.guild.id] = {
                                mtechannel: [...mte[msg.guild.id].mtechannel,channelid],
                            };
                        }
                        writeFile('../s_settings.json', JSON.stringify(mte, null, 4), err => {
                            if(err) throw err;
                            msg.channel.send("Added! :ok_hand:")
                        });
                    }
                    break;

                case "remove":
                case "delete":
                    var mte = require(dir);
                    if(!msg.mentions.channels.first()){
                        msg.channel.send("You have to tag a channel!")
                        return;
                    }else{
                        var channelid = msg.mentions.channels.first().id;
                        var rest = mte[msg.guild.id].mtechannel.filter(function(number) {
                            return number != channelid;
                        });
                        mte[msg.guild.id] = {
                            mtechannel: rest,
                        };
                        writeFile('../s_settings.json', JSON.stringify(mte, null, 4), err => {
                            if(err) throw err;
                            msg.channel.send("Removed! :ok_hand:")
                        });
                    }
                    break;

                default:
                    msg.channel.send("You have to define an action (add | remove)")
            }
            break
        default:
            var cEmbed = new RichEmbed()
                .setTitle("Server Settings Help Page!")
                .setDescription(`Here you can set some weird stuff, which you can't do anywhere else!`)
                .addBlankField()
                .addField(`Message to Embed feature [mte]`,`\`${config.prefix}serversettings mte add/remove #channel\``);
            msg.channel.send(cEmbed);
        break
    }
}

module.exports.config = {
    name: "serversettings",
	description: "You can choose a channel where your messages get turned into embeds!",
    usage: `<text>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["ss","serversetting","servset","serverset","serversets"],
    perms: ['MANAGE_GUILD']
}