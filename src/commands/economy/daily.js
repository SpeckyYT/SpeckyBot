module.exports = {
    name: "daily",
    category: "economy",
    description: "Claim your Daily Reward [Experimental]",
}

const moment = require("moment");
const db = require('quick.db');
const economy = new db.table('economy');

module.exports.run = async (bot, msg) => {
    const { author } = msg;

    const ld = economy.get(`${author.id}.lastDaily`);

    if (!ld) {
        economy.set(
            `${author.id}.lastDaily`,
            moment()
            .utc()
            .format()
        );
        economy.add(`${author.id}.money`,500)

        return msg.channel.send(
            bot.embed()
            .setTitle('Bank')
            .setDescription("You Claimed your **first** Daily reward.\n`500₪` has been added to your account.")
        );
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
        economy.set(
            `${author.id}.lastDaily`,
            moment()
            .utc()
            .format()
        );
        economy.add(`${author.id}.money`,250)

        return msg.channel.send(
            bot.embed()
            .setTitle('Bank')
            .setDescription("You Claimed your Daily reward.\n`250₪` has been added to your account.")

        );
    } else {
        return msg.channel.send(
            bot.embed()
            .setColor('#FF4444')
            .setTitle('Bank')
            .setDescription("You already claimed your reward.\nCheck back " + moment(nd).fromNow())
            .setTimestamp(moment(nd))
        );
    }
};
