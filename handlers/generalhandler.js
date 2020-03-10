module.exports = async (bot) => {
    try{
        await require('./missingdirectories')();
        await require('./missingfiles')();
        await require('./dependencies')();
        await require('./confighandler')();
        await require('./botloader')(bot);
        await require('./login')(bot);
    }catch(err){
        console.log("FATAL ERROR ON HANDLERS".fatal);
        console.log(err);
        process.exit(1);
    }
}
