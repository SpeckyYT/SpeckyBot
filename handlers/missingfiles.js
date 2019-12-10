const { existsSync, appendFileSync, openSync } = require('fs')

module.exports = async () => {
    let missingFiles = false;

    if (!existsSync('./config.json')) {
        await appendFileSync('./config.json','{\n"token": "TOKEN_HERE",\n"prefix": "PREFIX_HERE",\n"owner": "BOTOWNERID_HERE",\n"youtube": "YOUTUBE_V3_KEY_HERE"\n}')
        missingFiles = true
    }
    if (!existsSync('./s_settings.json')) {
        await appendFileSync('./s_settings.json','{}')
        missingFiles = true
    }
    if (!existsSync('./u_settings.json')) {
        await appendFileSync('./u_settings.json','{}')
        missingFiles = true
    }
    if (!existsSync('./textchannelcons.txt')) {
        await appendFileSync('./textchannelcons.txt','')
        missingFiles = true
    }

    openSync('./config.json','a', (err,fd) => {
        if(fd.includes('PLEASE EDIT THE CONFIG.JSON FILE')){
            console.log('PLEASE EDIT THE CONFIG.JSON FILE')
            
        }
    })

    if(missingFiles){return missingFiles}
}
