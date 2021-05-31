module.exports = {
    name: "donators",
    description: "Lists all the donators!",
    category: "important",
    aliases: ["donations","donation","donator","donate","patreon"]
}

const SDB = require('specky-database');

module.exports.run = async (bot, msg) => {
    const donations = (await SDB('donations.json'))
    .sort((a,b) => b.donation[0] - a.donation[0]);

    const string = donations
    .map(({name,donation}) => `**${name}**: ${donation[0].toFixed(2)}${donation[1]||'€'}`)
    .join('\n');

    const embed = bot.embed()
    .setTitle("Donators!")
    .setURL("https://www.paypal.me/speckyy")
    .setDescription(`Here you'll find the donators of SpeckyBot!\n\n${string}`)
    .setFooter("Thank you all for the support!", bot.user.displayAvatarURL());

    return msg.channel.send(embed);
}
