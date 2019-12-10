const { existsSync, appendFileSync, openSync } = require('fs')

module.exports = async () => {
    let missingFiles = false;

    if (!existsSync('./config.json')) {
        appendFileSync('./config.json','{\n"token": "TOKEN_HERE",\n"prefix": "PREFIX_HERE",\n"owner": "BOT_OWNER_ID_HERE",\n"youtube": "YOUTUBE_V3_KEY_HERE"\n}')
        missingFiles = true
    }
    ['s_settings','u_settings'].forEach(file => {
        if (!existsSync(`./${file}.json`)) {
            appendFileSync(`./${file}.json`,'{}')
            missingFiles = true
        }
    })
    if (!existsSync('./textchannelcons.txt')) {
        appendFileSync('./textchannelcons.txt','')
        missingFiles = true
    }

    if(missingFiles){return missingFiles}
}
