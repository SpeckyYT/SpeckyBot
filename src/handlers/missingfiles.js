const { existsSync, appendFileSync } = require('fs');

module.exports = async () => {
    if (!existsSync('../config.json')) {
        appendFileSync('../config.json','{\n"token": "TOKEN_HERE",\n"prefix": "PREFIX_HERE",\n"owner": ["BOT_OWNER1_ID_HERE", "BOT_OWNER2_ID_HERE"]\n}')
    }
    ['s','u'].forEach(file => {
        if (!existsSync(`../db/${file}_settings.json`)) {
            appendFileSync(`../db/${file}_settings.json`,'{}')
        }
    });
    ["commands.log"].forEach(file => {
        if (!existsSync(`../${file}`)) {
            appendFileSync(`../${file}`,'')
        }
    });
    ['userdata'].forEach(file => {
        if (!existsSync(`../db/${file}.json`)) {
            appendFileSync(`../db/${file}.json`,'{}')
        }
    });
}
