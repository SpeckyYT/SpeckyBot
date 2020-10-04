const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = async (bot) => {
    console.log("\n\n");

    const sequence =
    [
        "dependencies",
        "missingdirectories",
        "missingfiles",
        "confighandler",
        "loader",
        "login",
        "botfunctionsextra"
    ];

    [
        ...sequence,
        ...readdirSync(join(__dirname,'handlers')).map(v => sequence && v.match(/.[a-zA-Z]+$/g).length > 0 && !sequence.includes(v.replace(/.[a-zA-Z]+$/g,'')) ? v.replace(/.[a-zA-Z]+$/g,'') : null)
    ]
    .forEach(async handler => {
        if(!handler) return;

        console.log(`test`.dependency ? `handler\t${handler}.js`.dependency : `handler\t${handler}.js`);

        try{
            await require(join(__dirname,"handlers",handler))(bot);
        }catch(err){
            console.log(`handler\t${handler}.js`.error);
            console.log("FATAL ERROR ON HANDLERS".fatal);
            console.error(err);
            process.exit(1);
        }
    })
}
