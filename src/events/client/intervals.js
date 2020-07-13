module.exports = {
    event: "ready",
    type: "once"
}

module.exports.call = async (bot) => {
    bot.intervals = [];
    [
        ['interval_1_sec',        1 * 1000],
        ['interval_5_sec',        5 * 1000],
        ['interval_10_sec',      10 * 1000],
        ['interval_30_sec',      30 * 1000],
        ['interval_1_min',       60 * 1000],
        ['interval_5_min',   5 * 60 * 1000],
        ['interval_10_min', 10 * 60 * 1000],
        ['interval_20_min', 20 * 60 * 1000],
        ['interval_30_min', 30 * 60 * 1000],
        ['interval_1_hr',   60 * 60 * 1000],
    ]
    .forEach(async (event) => {
        await bot.emit(event[0]);
        bot.intervals.push(
            bot.setInterval(async () => {
                await bot.emit(event[0])
            },event[1])
        )
    })
}
