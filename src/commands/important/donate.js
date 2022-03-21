module.exports = {
    name: "donate",
    description: "Gives you a link to the donations!",
    category: "important",
    aliases: ["donations","donation","donator","donator","patreon"]
}

module.exports.run = async (bot, msg) => {
    const embed = bot.embed()
    .setTitle("Donate here!")
    .setURL("https://www.paypal.me/speckyy")
    .setFooter("Thank you all for the support!", bot.user.displayAvatarURL());

    return msg.channel.send(embed);
}
