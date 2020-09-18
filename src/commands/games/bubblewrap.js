module.exports = {
    name: "bubblewrap",
    description: "Gives you a virtual bubblewrap!",
    category: "games",
    aliases: ["bw"]
}

module.exports.run = async (bot, msg) => {
    return msg.channel.send(('||pop||'.repeat(Math.ceil(Math.random()*3+7))+'\n').repeat(Math.ceil(Math.random()*3+7)));
}
