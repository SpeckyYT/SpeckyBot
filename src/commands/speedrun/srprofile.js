module.exports = {
    name: 'srprofile',
    description: 'Gives you a Speedrun.com Profile!',
    category: 'speedrun',
    usage: '[@User|Username]',
    aliases: ['speedrunprofile']
}

const speedrun = new (require('node-speedrun'))({userAgent: 'Specky'});
const qdb = require('quick.db');
const SRdb = new qdb.table('speedrun');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, msg) => {
    const me = SRdb.get(msg.author.id);

    if(!msg.cmdContent && !me) return bot.cmdError('No user found');

    const name = msg.cmdContent || me.name;

    const user = await speedrun.users.get(name);

    if(!user.data) return bot.cmdError('User not found');

    const {id, names, weblink, 'name-style': namestyle, location} = user.data;

    const pbs = await speedrun.get(`/users/${id}/personal-bests?embed=game,category`);

    let color = 'RANDOM';

    if(namestyle){
        if(namestyle['color-from']){
            color = namestyle['color-from'].dark || color;
        }
    }

    return msg.channel.send(
        new MessageEmbed()
        .setThumbnail(`https://speedrun.com/themes/user/${names.international}/image.png`)
        .setTitle(`${names.international}${names.japanese?` (${names.japanese})`:''}`)
        .setURL(weblink)
        .setColor(color)
        .setDescription(
            [
                location && location.country && location.country.code ? `Country: :flag_${location.country.code}:`: '',
                '',
                pbs.data
                .slice(0,10)
                .map(run => `[#${String(run.place).padEnd(5,' ')}] ${run.game.data.names.international} (${run.category.data.name})`)
                .join('\n')
                .code('')
            ]
            .join('\n')
        )
    )
}
