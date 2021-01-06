module.exports = {
    name: 'profile',
    category: 'tmp'
}

const Canvas = require("discord-canvas");

module.exports.run = async (bot, msg) => {
    const image = await new Canvas.RankCard()
    .setAvatar(msg.author.avatarURL({format: 'png', size: 4096}))
    .setXP("current", 10)
    .setXP("needed", 20)
    .setReputation(50)
    .setRankName("professional")
    .setUsername(msg.author.tag)
    .setBadge(1, "diamond")
    .setBadge(2, "diamond")
    .setBadge(3, "diamond")
    .setBadge(4, "diamond")
    .setBadge(5, "diamond")
    .setBadge(6, "diamond")
    .setBadge(7, "diamond")
    .setBadge(8, "diamond")
    .setBadge(9, "diamond")
    .setBackground("https://secure.gravatar.com/bg/199291990/5bacdf32e62a76680ff3576318e70702")
    .toAttachment();

    return msg.channel.send(image.toBuffer().toAttachment('rank-card.png'));
}
