module.exports = {
    name: "djsdocs",
    description: "Lets you browse the Discord.js Documentation!",
    category: 'dev',
    aliases: ['djsdoc']
}

const djsdoc = require('discord.js-docs');
const { inspect } = require('util');

module.exports.run = async (bot,msg) => {
    let { doc } = this;
    if(!doc) doc = await djsdoc.fetch('master');

    if(!msg.cmdContent) return bot.cmdError('Missing query');

    const res = doc.get(...msg.args);

    if(!res) return bot.cmdError('Invalid query');

    const embed = bot.embed();

    if(res.name)
        embed.setTitle(res.name);
    if(res.description)
        embed.setDescription(res.description);
    if(res.type)
        embed.addField('Type',toCode(res.type));
    if(res.examples)
        embed.addField('Examples',res.examples.map(e => e.code('js')).join('\n'));
    if(res.params)
        embed.addField('Parameters',toCode(res.params.map(p => p.name)));
    if(res.extends)
        embed.addField('Extends',toCode(res.extends));
    if(res.props)
        embed.addField('Properties',toCode(res.props.map(p => p.name)));
    if(res.methods)
        embed.addField('Methods',toCode(res.methods.map(m => m.name)));
    if(res.events)
        embed.addField('Events',toCode(res.events.map(e => e.name)));
    if(res.returns)
        embed.addField('Returns',toCode(
            res.returns.types || res.returns.description ?
                {
                    types:flat(res.returns.types),
                    description:res.returns.description
                }
                : flat(res.returns)
        ));
    if(res.meta)
        embed.addField('Meta',toCode(res.meta));

    return msg.channel.send(embed);
}

function toCode(obj){
    return inspect(obj,false,3).code('js')
}

function flat(arr){
    if(!Array.isArray(arr)) return arr;
    return arr.flat(Infinity).join('');
}
