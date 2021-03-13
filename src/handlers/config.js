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
    }catch(err){
        console.log("Wasn't able to load config.json a new file got created: template.config.json".error);

        if (!existsSync(join(process.cwd(),'..','template.config.json'))) {
            appendFileSync(join(process.cwd(),'..','template.config.json'), JSON.stringify(template,null,4));
        }

        throw new Error("config.json is invalid".error);
    }


    const nConfig = Object.assign({},config);

    const strings = [
        "token",
        "prefix",
        "color",
    ];

    const bools = [
    ];

    const arrays = [
        "owner",
    ];

    const apikeys = [
    ];

    for(const conf of strings)
        if(typeof nConfig[conf] != "string")
            nConfig[conf] = conf.toUpperCase();

    for(const conf of bools)
        if(typeof nConfig[conf] != "boolean")
            nConfig[conf] = false;

    for(const conf of arrays)
        if(!Array.isArray(nConfig[conf]))
            nConfig[conf] = [];

    if(typeof nConfig.apikeys != 'object')
        nConfig.apikeys = {};

    for(const apikey of apikeys)
        if(!nConfig.apikeys[apikey])
            nConfig.apikeys[apikey] = apikey.toUpperCase();

    if(!Object.is(config, nConfig)){
        const conf = JSON.stringify(nConfig, null, 4)

        writeFileSync(join(process.cwd(),'..','config.json'), conf, {})
    }

    Object.defineProperty(bot, 'config', {
        enumerable: false,
        writable: false,
        value: nConfig
    });
}
