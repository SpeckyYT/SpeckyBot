const { writeFileSync, appendFileSync, existsSync, readFileSync } = require('fs');
const { join } = require('path');

module.exports = (bot) => {
    const template =
    {
        token: "TOKEN_HERE",
        prefix: "PREFIX_HERE",
        owner: ["BOT_OWNER1_ID_HERE", "BOT_OWNER2_ID_HERE"]
    }

    let config;

    try{
        config = JSON.parse(
            readFileSync(
                join(process.cwd(),'..','config.json')
            )
        );
        if(typeof config.apikeys == "object"){
            Object.keys(config.apikeys).forEach(prop => config[prop] = config.apikeys[prop])
        }
    }catch(err){
        console.log("Wasn't able to load config.json a new file got created: template.config.json".error);

        if (!existsSync(join(process.cwd(),'..','template.config.json'))) {
            appendFileSync(join(process.cwd(),'..','template.config.json'), JSON.stringify(template,null,4));
        }

        throw new Error("config.json is invalid".error);
    }


    const nConfig = config;

    const items = ["token","prefix","color"]
    const bools = ["extra_apikeys","reply_unexisting_command","load_nsfw"]
    const apikeys = ["youtube"]
    const arrays = ["owner","bannedUsers"]

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
        const conf = JSON.stringify(nConfig, null, 4)

        writeFileSync(join(process.cwd(),'..','config.json'), conf, {})
    }

    bot.config = config;
}
