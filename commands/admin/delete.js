module.exports.run = async (bot, msg, args, config) => {
    let { args } = msg;
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

module.exports.config = {
    name: "delete",
	description: "Deletes a message for you!",
    usage: `<messageID>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: ["deletion", "msgdelet","msgdelete","delet"],
    perms: ['MANAGE_MESSAGES'],
    cmdperms: ['MANAGE_MESSAGES']
}
