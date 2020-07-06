module.exports = {
    name: "daily",
    aliases: [],
    usage: "",
    category: "economy",
    description: "Claim your Daily Reward [Experimental]",
}

const moment = require("moment");

module.exports.run = async (bot, msg) => {
    const { economy } = bot
    const { author } = msg;

    const ld = economy[author.id].lastDaily;

    if (ld == "") {
        economy[author.id].lastDaily = moment()
        .utc()
        .format();
        economy[author.id].money += 500;

        const embed = bot.embed()
        .setTitle('Bank')
        .setDescription("You Claimed your **first** Daily reward.\n`500₪` has been added to your account.")
        return msg.channel.send(embed);
    }

    const nd = moment(ld)
    .add(1, "day")
    .utc()
    .format();
    const ct = moment()
    .utc()
    .format();
    const cr = moment(ct).isSameOrAfter(nd);

    if (cr) {
        economy[author.id].lastDaily = moment()
        .utc()
        .format();
        economy[author.id].money += 250;

        const embed = bot.embed()
        .setTitle('Bank')
        .setDescription("You Claimed your Daily reward.\n`250₪` has been added to your account.")

        msg.channel.send(embed);
    } else {
        const embed = bot.embed()
        .setColor('#FF4444')
        .setTitle('Bank')
        .setDescription("You already claimed your reward.\nCheck back " + moment(nd).fromNow())
        .setTimestamp(moment(nd))
        msg.channel.send(embed);
    }
};
