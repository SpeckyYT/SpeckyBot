module.exports = {
    event: "ready"
}

module.exports.call = async bot => {
    [
    'interval_5_sec',
    'interval_10_sec',
    'interval_30_sec',
    'interval_1_min',
    'interval_5_min',
    'interval_10_min'
    ]
    .forEach(event => {
        bot.emit(event, null);
    })
}