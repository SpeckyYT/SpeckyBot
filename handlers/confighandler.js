let { writeFileSync, appendFileSync, existsSync } = require('fs')

module.exports = async () => {
    let template = '{\n"token": "TOKEN_HERE",\n"prefix": "PREFIX_HERE",\n"owner": ["BOT_OWNER1_ID_HERE", "BOT_OWNER2_ID_HERE"],\n"youtube": "YOUTUBE_V3_KEY_HERE"\n}'

    let config;
    
    try{
        config = require('../config.json')
    }catch(err){
        console.log("Wasn't able to load config.json a new file got created: templateconfig.json".error);
        
        if (!existsSync('./templateconfig.json')) {
            appendFileSync('./templateconfig.json', template);
        }

        return new Promise((resolve, reject) => reject("config.json is invalid".error))
    }


    let nConfig = config;

    const items = ["token","prefix"]
    const bools = ["extra_apikeys"]
    const apikeys = ["youtube","osu"]
    const arrays = ["owner"]

    items.forEach(conf => {
        if(typeof config[conf] == "undefined"){
            nConfig[conf] = conf.toUpperCase()
        }
    });

    bools.forEach(conf => {
        if(typeof config[conf] != "boolean"){
            nConfig[conf] = false;
        }
    })

    if(typeof config.apikeys != "object"){
        nConfig.apikeys = {}
    }

    if(config.extra_apikeys == true){
        apikeys.forEach(conf => {
            if(typeof config.apikeys[conf] == "undefined"){
                nConfig.apikeys[conf] = conf.toUpperCase()
            }
        })
    }

    arrays.forEach(conf => {
        if(typeof config[conf] == "undefined"){
            nConfig[conf] = []
        }
    });

    if(Object.is(config, nConfig)){
        let conf = JSON.stringify(nConfig, null, 4)

        writeFileSync('./config.json', conf, {})
    }
}
