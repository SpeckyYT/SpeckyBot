module.exports = function (guild_id, config) {

    const choice = [0,1,1,1].pick();

    if (choice) {
        return ({
            string: 'Simon says',
            real: config.opposite_day ? false : true
        })
    }

    return ({
        string: config.fakeStarts.pick(),
        real: config.opposite_day ? true : false
    })
}

