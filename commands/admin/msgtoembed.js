const { writeFile } = require("fs");
const dir = '../../../s_settings.json'

module.exports.run = async (bot, msg, args, owner, prefix) => {
    switch(args[0]){
        case "add":
            var mte = require(dir);
            if(!msg.member.hasPermission(["MANAGE_MESSAGES"]) && !msg.member.hasPermission(["ADMINISTRATOR"]) && !(msg.member.id == owner)){
                msg.channel.send("You can't use this command!");
                return;
            }else if(!msg.mentions.channels.first()){
                msg.channel.send("You have to tag a channel!")
                return;
            }else{
                var channelName = msg.mentions.channels.first().id;
                mte [msg.guild.id] = {
                    mtechannel: channelName,
                };
                writeFile('../s_settings.json', JSON.stringify(mte, null, 4), err => {
                    if(err) throw err;
                    msg.channel.send("Added! :ok_hand:")
                });
            }
            break;
        case "remove":
            break;

        default:
            msg.channel.send("You have to define an action (add | remove)")
    }
}

module.exports.config = {
    name: "msgtoembed",
	description: "You can choose a channel where your messages get turned into embeds!",
    usage: `<text>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["mte","msgtemb","msgtoemb","messagetoemb"]
}