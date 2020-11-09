module.exports = {
    name: "donators",
    description: "Lists all the donators!",
    category: "important",
    aliases: ["donations","donation","donator","patreon"]
}

const { join } = require('path');
const { readFileSync } = require('fs');
const { Collection } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const don = JSON.parse(
        readFileSync(join(__dirname,'data','donations.json'),{encoding:'utf-8'})
    )

    const obj = new Collection();
    Object.keys(don)
    .map(k => obj.set(k,don[k]))

    const donators = obj.sort((a, b) => console.table({a,b}) || b[0] - a[0]);

    const string = donators.map((donation, donator) => `**${donator}**: ${donation[0].toFixed(2)}${donation[1]||'€'}`).join('\n');

    const embed = bot.embed()
    .setTitle("Donators!")
    .setURL("https://www.paypal.me/speckyy")
    .setDescription(`Here you'll find the donators of SpeckyBot!\n\n${string}`)
    .setFooter("Thank you all for the support!", bot.user.displayAvatarURL());

    return msg.channel.send(embed);
}
