const { existsSync, appendFileSync } = require('fs')

module.exports = async () => {
    if (!existsSync('./config.json')) {
        appendFileSync('./config.json','{\n"token": "TOKEN_HERE",\n"prefix": "PREFIX_HERE",\n"owner": "BOT_OWNER_ID_HERE",\n"youtube": "YOUTUBE_V3_KEY_HERE"\n}')
    }
    ['s_settings','u_settings'].forEach(file => {
        if (!existsSync(`./${file}.json`)) {
            appendFileSync(`./${file}.json`,'{}')
        }
    })
    if (!existsSync('./textchannelcons.txt')) {
        appendFileSync('./textchannelcons.txt','')
    }
}
