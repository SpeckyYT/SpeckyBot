module.exports = {
    name: "bubblewrap",
    description: "Gives you a virtual bubblewrap!",
    usage: ``,
    category: `games`,
    accessableby: "Members",
    aliases: ["bw"]
}

module.exports.run = async (bot, msg) => {
    return msg.channel.send(('||pop||'.repeat(Math.ceil(Math.random()*5+5))+'\n').repeat(Math.ceil(Math.random()*5+5)));
}
