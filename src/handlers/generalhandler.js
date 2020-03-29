module.exports = async (bot) => {
    console.log("\n\n");
    ["dependencies","missingdirectories","missingfiles","confighandler","botloader","login","botfunctionsextra","website"]
    .forEach(async handler => {
        try{
            console.log(`test`.dependency ? `handler\t${handler}.js`.dependency : `handler\t${handler}.js`);
            await require(`./${handler}.js`)(bot);
        }catch(err){
            console.log(`handler\t${handler}.js`.error);
            console.log("FATAL ERROR ON HANDLERS".fatal);
            console.log(err);
            setTimeout(async () => {
                process.exit(1);
            }, 10000)
        }
    })
}
