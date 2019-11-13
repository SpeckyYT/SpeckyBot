const Discord = require("discord.js");

module.exports.run = async (bot, msg, args, config) => {
    if(!args[0] || isNaN(args[0])){
        msg.channel.send("You have to define message quantity to delete");
        return;
    }
    const maxpurge = 10000;

    var beg = args[0] 
    msg.delete();
    if(beg > maxpurge) return msg.channel.send(`You can't purge more than ${maxpurge} messages at once!`);
    if(beg < 0) return;
    if(beg > 100){
        var mess = beg
        while(mess > 100){
            await msg.channel.bulkDelete(100)
                .then()
                .catch();
            mess -= 100;
        }
        beg = mess;
    }

    if(beg > 0){
    await msg.channel.bulkDelete(beg)
        .then()
        .catch();
    }

    msg.channel.send("Finished purging!")
    .then(ms => ms.delete(5000))
    .catch();
}

module.exports.config = {
    name: "purge",
	description: "Deletes a TON of messages for you!",
    usage: `<message quantity>`,
    category: `admin`,
	accessableby: "Server Admins and Moderators",
    aliases: []
}