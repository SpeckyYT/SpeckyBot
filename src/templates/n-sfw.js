const { MessageEmbed } = require('discord.js');
const { Nekos, NekoLove, Miss, HMtai, Freaker } = require('hmfull');
const promisify = require('promisify-func');

async function handle(bot, msg, methods, sfw){
    const method = Array.isArray(methods) ? methods.pick() : methods;

    const api = [NekoLove, Miss, HMtai, Freaker]
    .filter(api => api[sfw][method])
    .pick();

    if(!api) return bot.cmdError('Endpoint not found');

    return msg.channel.send(
        await promisify(api[sfw][method]())()
        .then(img => new MessageEmbed().setImage(img.url))
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

