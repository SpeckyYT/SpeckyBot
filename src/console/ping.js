module.exports = {
    name: 'ping'
}

module.exports.run = async (bot, data) => {
    const diff = data.timeStamp - new Date();
    console.log(`Pong! (${diff<0?0:diff}ms)`.cli);
}
