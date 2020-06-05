module.exports = {
    name: "meme",
    description: "Sends a meme!",
    usage: "",
    category: "misc",
    accessibleby: "member",
    aliases: []
}

const fetch = require("node-fetch");

module.exports.run = async (bot, msg) => {
    const msg1 = await msg.channel.send("Please Wait, making fresh memes...");

    fetch("https://apis.duncte123.me/meme")
    .then(res => res.json())
    .then(body => {
        if (!body || !body.data.image) return msg.reply("Something went wrong, try again!");
        const embed = bot.embed()
        .setAuthor(`${bot.user.username} gives you memes!`, msg.guild.iconURL)
        .setImage(body.data.image);
        if (body.data.title) {
            embed.setTitle(body.data.title).setURL(body.data.url);
        }
        msg1.edit(embed);
    })
}
