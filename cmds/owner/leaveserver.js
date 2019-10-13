module.exports.run = async (bot, msg, args, owner) => {
    if(!msg.author.id === owner){
        msg.channel.send("You aren't my owner.");
        return;
    }
    if(!args[0]) return msg.channel.send("You have to define a server");
    msg.channel.send("Not working yet :(")
}

module.exports.config = {
    name: "leaveserver",
    aliases: []
}