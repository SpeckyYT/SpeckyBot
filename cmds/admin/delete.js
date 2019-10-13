const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!msg.member.hasPermission(["MANAGE_MESSAGES"]) && !msg.member.hasPermission(["ADMINISTRATOR"]) && !(msg.member.id == owner)){
        msg.channel.send("You can't use this command!");
        return;
    }else{
        if(!args[0]){
            msg.channel.send("You have to define a message to delete");
            return;
        }
        msg.channel.fetchMessage(args[0]).then(ms => {
            if(ms.deletable){
                msg.delete();
                ms.delete();
            }else{
                msg.channel.send("The message is not deletable or doesn't exist");
            }
        });
    }
}

module.exports.config = {
    name: "delete",
	description: "Deletes a message for you!",
	usage: `<messageID>`,
	accessableby: "Server Admins and Moderators",
    aliases: ["deletion", "msgdelet","msgdelete","delet"]
}