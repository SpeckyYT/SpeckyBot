module.exports = {
    name: "usersettings",
    description: "What about customization?",
    usage: `<setting> <values>`,
    category: "utilities",
    flags: ['showall','deleteall'],
    aliases: ["us","usersetting"]
}

const qdb = require('quick.db');
const usersettings = new qdb.table('usersettings');
const { Util: { resolveColor } } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const options = [
        {
            names: ['embedcolor','embcol','ec'],
            description: 'Change the default color on your embeds!',
            dbkey: 'embedcolor',
            usage: '<HEX COLOR>',
            type: ({arg}) => resolveColor(arg.toUpperCase())
        },
        {
            names: ['ghostping','gp'],
            description: 'Notifies you if you get ghostpinged!',
            dbkey: 'ghostping',
            type: 'boolean'
        },
        {
            names: ['math'],
            description: 'Automatically does maths for you!',
            dbkey: 'math',
            type: 'boolean'
        },
        {
            names: ['messagelink','ml'],
            description: 'Automatically quotes your message links!',
            dbkey: 'messagelink',
            type: 'boolean'
        },
        {
            names: ['invalidcommand','ic'],
            description: "Tries to guess the command you wanted to run if it doesn't exist!",
            dbkey: 'invalidcommand',
            type: 'boolean'
        }
    ];

    const option = options.find(opt => opt.names.includes(msg.args[0]));

    if(option){
        const dbstring = `${msg.author.id}.${option.dbkey}`;
        const current = usersettings.get(dbstring);

        if(typeof option.type == 'string'){
            switch(option.type){
                case 'boolean':
                    usersettings.set(dbstring,!current);
                    return bot.cmdSuccess(draw(option.dbkey,!current));
            }
        }
        if (typeof option.type == 'function'){
            let value = option.type(
                {
                    arg: msg.args[1] || '',
                    args: msg.args.slice(1)
                }
            )
            if(isNaN(value) && typeof value == 'number') value = 0;
            usersettings.set(dbstring,value);
            return bot.cmdSuccess(draw(option.dbkey,value));
        }
    }else if(msg.flag('showall')){
        return msg.channel.send(
            JSON.stringify(
                usersettings.get(`${msg.author.id}`),
                null,
                2
            ).code('json')
        )
    }else if(msg.flag('deleteall')){
        usersettings.delete(`${msg.author.id}`);
        return bot.cmdSuccess('Deleted all your usersettings!');
    }else{
        return msg.channel.send(
            bot.embed()
            .setTitle("Usersettings Help Page!")
            .setDescription(`Here you can set some weird stuff, which you can't do anywhere else!`)
            .addField('\u200b','\u200b')
            .addFields(
                options.map(
                    opt => ({
                        name: opt.description,
                        value: `\`${bot.config.prefix}usersettings ${opt.names[0]}${opt.usage && " "+opt.usage || ''}\``
                    })
                )
            )
        )
    }
}

function draw(key, value){
    return `Your \`${key}\` option got set to \`${value}\``
}
