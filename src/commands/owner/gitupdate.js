module.exports = {
    name: "gitupdate",
    description: "Updates the bot!",
    category: "owner"
}

const cp = require('child_process');

module.exports.run = async (bot, msg) => {
    function run(command){
        return new Promise((res,rej) => {
            cp.exec('',()=>{})
            .on('error', () => rej())
            .on('close', () => res());
        })
    }

    try{
        await run('git reset --hard origin/master');
        await run('git fetch --all');
        await run('git pull origin');
        return bot.cmdSuccess('Bot should be successfully updated!');
    }catch(err){
        return bot.cmdError("Wasn't able to update the bot");
    }
}
