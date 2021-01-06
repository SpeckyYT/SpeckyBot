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
const size = 30;

module.exports.run = async (bot, msg) => {
    const me = SRdb.get(msg.author.id);

    const name = msg.cmdContent || me.name || msg.author.username;

    const user = await speedrun.users.get(name);

    if(!user.data) return bot.cmdError('User not found');

    const {id, names, weblink, 'name-style': namestyle, location} = user.data;

    const m = await msg.channel.send(bot.embed().setTitle('Loading...'));

    const pbs = await speedrun.get(`/users/${id}/personal-bests?embed=game,category`);

    let color = 'RANDOM';

    if(namestyle){
        if(namestyle['color-from']){
            color = namestyle['color-from'].dark || color;
        }
    }

    // remove duplicate runs
    const tmppbs = [];
    const npbs = pbs.data
    .filter(r => {
        const string = `${r.place}|${r.game.data.names.international}|${r.category.data.name}`;
        if(tmppbs.includes(string)) return false;
        return tmppbs.push(string) || true;
    })

    const defembed = () =>
        new MessageEmbed()
        .setThumbnail(`https://speedrun.com/themes/user/${names.international}/image.png`)
        .setTitle(`${names.international}${names.japanese?` (${names.japanese})`:''}`)
        .setURL(weblink)
        .setColor(color)

    const grouppbs = []
    npbs.forEach((pb,i) => {
        const group = Math.floor(i/size);
        if(!grouppbs[group]) grouppbs[group] = [];
        grouppbs[group].push(pb);
    })

    const pages = await Promise.all(grouppbs.map(async (pbs) =>
        defembed()
        .setDescription(
            [
                location && location.country && location.country.code ? `Country: :flag_${location.country.code}:`: '',
                '',
                (await pbsAsString(pbs)).join('\n').code('')
            ]
            .join('\n')
        )
    ));

    return m.edit(pages[0]);
}

async function getSubcategories(run) {
    const variables = run.run.values;

    const ret = [];

    for (let _variable of Object.keys(variables)) {
        const variable = (await speedrun.get(`/variables/${_variable}`)).data;
        if (variable["is-subcategory"]) {
            ret.push(
                variable.values.values[variables[_variable]].label
            )
        }
    }

    return ret;
}

async function pbsAsString(pbs) {
    const pbsAsString = [];

    for (let run of pbs) {
        const subcat = await getSubcategories(run);
        let subcategoriesAsString = "";
        if (subcat.length > 0) {
            subcategoriesAsString = ` (${subcat.join(", ")})`
        }

        pbsAsString.push(
            `[#${String(run.place).padEnd(5,' ')}] ${run.game.data.names.international} (${run.category.data.name})${subcategoriesAsString}`
        )
    }

    return pbsAsString
}
