const { readdirSync } = require('fs');

module.exports = async (bot) => {
    console.log("\n\n");

    const sequence =
    [
        "dependencies",
        "missingdirectories",
        "missingfiles",
        "confighandler",
        "botloader",
        "login",
        "botfunctionsextra"
    ];

    [
        ...sequence,
        ...readdirSync('./handlers/').map(v => sequence && v.match(/.[a-zA-Z]+$/g).length > 0 && !sequence.includes(v.replace(/.[a-zA-Z]+$/g,'')) ? v.replace(/.[a-zA-Z]+$/g,'') : null)
    ]
    .forEach(async handler => {
        if(!handler) return;
        try{
            console.log(`test`.dependency ? `handler\t${handler}.js`.dependency : `handler\t${handler}.js`);
            await require(`./handlers/${handler}.js`)(bot);
        }catch(err){
            console.log(`handler\t${handler}.js`.error);
            console.log("FATAL ERROR ON HANDLERS".fatal);
            console.error(err);
            process.exit(1);
        }
    })
}
