module.exports = {
    name: 'ping',
    aliases: []
}

module.exports.run = async (bot, data) => {
    const diff = data.timeStamp - new Date();
    console.log(`Pong! (${diff<0?0:diff}ms)`.cli);
}