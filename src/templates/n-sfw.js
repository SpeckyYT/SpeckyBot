const { Nekos, NekoLove, Miss, HMtai, Freaker } = require('hmfull');
const promisify = require('promisify-func');

const apis = [NekoLove, Miss, HMtai, Freaker];

async function handle(bot, msg, methods, sfw){
    methods = Array.isArray(methods) ? methods : [methods];

    const api = apis
    .map(api => api[sfw])
    .map(api =>
        Object
        .entries(api)
        .filter(([name]) => methods.includes(name))
        .map(([_,f]) => f)
    )
    .flat()
    .pick();

    if(!api) return bot.cmdError('Endpoint not found');

    return msg.channel.send(
        await promisify(api())()
        .then(img => bot.membed().setImage(img.url))
    )
}

module.exports.nsfw = ({methods}) =>
    async function(bot,msg){
        return handle(bot, msg, methods, 'nsfw');
    }

module.exports.sfw = ({methods,methodsNSFW}) =>
    async function(bot,msg){
        if(methodsNSFW && !msg.flag("sfw") && msg.channel.isNSFW())
            return module.exports.nsfw({methods: methodsNSFW})(bot,msg);
        return handle(bot, msg, methods, 'sfw');
    }

