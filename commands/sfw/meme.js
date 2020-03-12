const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { m } = require("../../config.json");

module.exports = {
    name: "meme",
    description: "Sends a meme from a website!",
    usage: "",
    category: "images",
    accessibleby: "member",
    aliases: [""]
}

  module.exports.run = async (bot, msg, args) => {
    let msg1 = await msg.channel.send("Please Wait, making fresh memes...");

    fetch("https://apis.duncte123.me/meme")
      .then(res => res.json())
      .then(body => {
        if (!body || !body.data.image)
          return msg.reply("Something went wrong, try again!");

        let embed = bot.embed()
          .setAuthor(`${bot.user.username} gives you memes!`, msg.guild.iconURL)
          .setImage(body.data.image)
          .setTimestamp()
          .setFooter(
            bot.user.username.toUpperCase(),
            bot.user.displayAvatarURL
          );

        if (body.data.title) {
          embed.setTitle(body.data.title).setURL(body.data.url);
        }
        msg1.edit(embed);
      });
  };