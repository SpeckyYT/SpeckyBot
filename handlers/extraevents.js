module.exports = async bot => {
    setInterval(() => {
        bot.emit('interval_5_sec', null);
    },5000)

    setInterval(() => {
        bot.emit('interval_10_sec', null);
    },10000)

    setInterval(() => {
        bot.emit('interval_30_sec', null);
    },30000)

    setInterval(() => {
        bot.emit('interval_1_min', null);
    },60000)

    setInterval(() => {
        bot.emit('interval_5_min', null);
    },60000*5)

    setInterval(() => {
        bot.emit('interval_10_min', null);
    },60000*10)
}