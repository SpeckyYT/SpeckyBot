const fetch = require('node-fetch');

module.exports['ize-ify.io'] = ({domain,handler}) =>
    function(bot,msg){
        const newContent = msg.cmdContent.replace(/[^a-zA-Z]/g,'');
        if(!newContent) return bot.cmdError('You have to include a valid name');
        return fetch(`https://api.${domain}.io/?name=${newContent}`)
        .then(d=>d.json())
        .then(d=>handler(bot,msg,d))
        .catch(e=>bot.cmdError(e))
    }
