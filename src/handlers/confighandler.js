let { writeFileSync, appendFileSync, existsSync } = require('fs')

module.exports = async () => {
    let template = 
    {
        token: "TOKEN_HERE",
        prefix: "PREFIX_HERE",
        owner: ["BOT_OWNER1_ID_HERE", "BOT_OWNER2_ID_HERE"]
    }

    let config;
    
    try{
        config = require('../../config.json');
    }catch(err){
        console.log("Wasn't able to load config.json a new file got created: template.config.json".error);
        
        if (!existsSync('../template.config.json')) {
            appendFileSync('../template.config.json', JSON.stringify(template,null,4));
        }

        return new Promise((resolve, reject) => reject("config.json is invalid".error))
    }


    let nConfig = config;

    const items = ["token","prefix","color"]
    const bools = ["extra_apikeys","reply_unexisting_command","load_nsfw"]
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

        writeFileSync('../config.json', conf, {})
    }
}
