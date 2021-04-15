module.exports = {
    name: "balance",
    aliases: ["bal", "bank", "money"],
    category: "economy",
    description: "Gets your current bot balance",
}

const db = require('quick.db');
const economy = new db.table('economy');

module.exports.run = async (bot, msg) => {
    let user;

    const otheruser = msg.mentions.users.first();
    if(otheruser){
        bot.economySummon(otheruser);
        user = otheruser;
    }

    user = user || msg.author;

    const embed = bot.embed()
    .setTitle('Bank')
    .setAuthor(user.tag,user.displayAvatarURL({format:'png'}))
    .setThumbnail(user.displayAvatarURL({format:'png'}))
    .addField("Balance", economy.get(user.id).money + "₪", true)
    msg.channel.send(embed);
};
