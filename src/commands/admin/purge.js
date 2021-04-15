module.exports = {
    name: "purge",
    description: "Deletes a TON of messages for you!",
    usage: `<message quantity>`,
    category: "admin",
    userPerms: 8192,
    botPerms: 8192
}

const maxpurge = 10000;

module.exports.run = async (bot, msg) => {
    if(!msg.args[0] || isNaN(msg.args[0])){
        return bot.cmdError("You have to define message quantity to delete");
    }

    let beg = Number(msg.args[0]);

    if(beg > maxpurge) return bot.cmdError(`You can't purge more than ${maxpurge} messages at once!`);
    if(beg < 0) beg = -beg;

    while(beg > 0){
        const amount = beg > 100 ? 100 : beg;
        beg -= amount;
        await msg.channel.bulkDelete(amount, true)
        .catch(() => beg = 0);
    }

    return bot.cmdSuccess("Finished purging!");
}

