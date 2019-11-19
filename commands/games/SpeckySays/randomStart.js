module.exports = function (guild_id, config) {
    
    let choice = getRandomInt(4)

    if (choice != 0) {
        return ({
            string: 'Simon says',
            real: config.opposite_day ? false : true
        })
    }

    return ({
        string: config.fakeStarts[getRandomInt(config.fakeStarts.length)],
        real: config.opposite_day ? true : false
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}