const { existsSync, appendFileSync } = require('fs')

module.exports = async () => {
    if (!existsSync('./config.json')) {
        appendFileSync('./config.json','{\n"token": "TOKEN_HERE",\n"prefix": "PREFIX_HERE",\n"owner": ["BOT_OWNER1_ID_HERE", "BOT_OWNER2_ID_HERE"],\n"youtube": "YOUTUBE_V3_KEY_HERE"\n}')
    }
    ['s','u'].forEach(file => {
        if (!existsSync(`./${file}_settings.json`)) {
            appendFileSync(`./${file}_settings.json`,'{}')
        }
    })
    if (!existsSync('./textchannelcons.txt')) {
        appendFileSync('./textchannelcons.txt','')
    }
}
