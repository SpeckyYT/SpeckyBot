module.exports = {
    name: "donators",
    description: "Lists all the donators!",
    category: "important",
    aliases: ["donations","donation","donator","patreon"]
}

module.exports.run = async (bot, msg) => {
    const don = {
        Benjiman: [1.15,'€'], // 525006281703161867
        "Dav!d" : [1.16,'€']  // 555791735607787580
    };
    const donators = don.toCollection().sort((a, b) => b[0] - a[0]);

    const embed = bot.embed()
    .setTitle("Donators!")
    .setURL("https://www.paypal.me/speckyy")
    .setDescription("Here you'll find the donators of SpeckyBot!")
    .setFooter("Thank you all for the support!", bot.user.avatarURL)

    donators.forEach((donation, donartor) => embed.addField(donartor, donation[0].toFixed(2) + (donation[1]||'€')))

    return msg.channel.send(embed);
}
