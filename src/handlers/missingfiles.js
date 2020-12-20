const { existsSync, appendFileSync } = require('fs');
const { join } = require('path');

module.exports = () => {
    const template =
    {
        token: "TOKEN_HERE",
        prefix: "PREFIX_HERE",
        owner: ["BOT_OWNER1_ID_HERE", "BOT_OWNER2_ID_HERE"]
    }

    const config = join(process.cwd(),'..','config.json');
    if (!existsSync(config))
        appendFileSync(config, JSON.stringify(template,null,4));

    ['s_settings','u_settings'].forEach(file => {
        const db = join(process.cwd(),'..','db',`${file}.json`);
        if (!existsSync(db))
            appendFileSync(db, '{}');
    });

    ["commands.log"].forEach(file => {
        const log = join(process.cwd(),'..',file)
        if (!existsSync(log))
            appendFileSync(log, '');
    });
}
