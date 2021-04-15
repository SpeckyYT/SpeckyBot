module.exports = {
    name: "delete",
    description: "Deletes a message for you!",
    usage: `<messageID>`,
    category: "admin",
    aliases: ["deletion", "msgdelet","msgdelete"],
    userPerms: 8192,
    botPerms: 8192
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    if(!args[0]){
        msg.channel.send("You have to define a message to delete");
        return;
    }
    msg.channel.messages.fetch(args[0]).then(ms => {
        if(ms.deletable){
            msg.delete();
            ms.delete();
        }else{
            msg.channel.send("The message is not deletable or doesn't exist");
        }
    });
}
