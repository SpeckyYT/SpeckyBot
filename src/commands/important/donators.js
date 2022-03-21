module.exports = {
    name: "donators",
    description: "Lists all the donators!",
    category: "important",
    aliases: ["donations","donation","donator","donate","patreon"]
}

module.exports.run = async (bot, msg) => {
    const embed = bot.embed()
    .setTitle("Donators!")
    .setURL("https://www.paypal.me/speckyy")
    .setFooter("Thank you all for the support!", bot.user.displayAvatarURL());

    return msg.channel.send(embed);
}
