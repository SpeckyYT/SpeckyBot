module.exports = {
    name: "8ball",
    description: "Ask it to the 8-Ball!",
    usage: "[question]",
    category: "misc",
    type: 'send',
    aliases: ["8b","magic8ball","m8b"]
}

const yes = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes – definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes"
];
const maybe = [
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again"
];
const no = [
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

module.exports.run = async (bot, msg) =>
    bot.embed()
    .setTitle('Magic 8-Ball')
    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/8-Ball_Pool.svg/1024px-8-Ball_Pool.svg.png")
    .setDescription([yes,maybe,no].pick().pick());
