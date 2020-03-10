module.exports = {
    name: "corona",
	description: "Gives you how many people are infected by corona!",
    usage: `[number]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["coronavirus"]
}

const fetch = require('node-fetch')
const { RichEmbed, Collection } = require('discord.js');

module.exports.run = async (bot, msg) => {
    let API = 'https://coronavirus-tracker-api.herokuapp.com/confirmed';

    let res = await fetch(API, {headers: {Accept: 'application/json'}})
    let { last_updated, latest, locations } = await res.json()

    let top = new Collection();

    let topmax = isNaN(msg.args[0]) ? 5 : msg.args[0];

    if(topmax < 3){
        topmax = 3;
    }

    locations.forEach(object => {

        let t = top.get(object.country);

        if(t){
            top.set(object.country, object.latest + t);
        }else{
            top.set(object.country, object.latest);
        }
    })

    top = top.sort((a,b) => b-a);

    let string = "";
    let index = 0;

    while(index < topmax){
        string = `${string}\n${top.firstKey()}: ${top.first()}`;
        top.delete(top.firstKey());
        index++;
        if(string.length > 950){
            break;
        }
    }

    string = string.trim();

    let embed = new RichEmbed()
    .setTitle('CoronaVirus')
    .addField("Total verified cases",`${latest} cases`)
    .addBlankField()
    .addField(`Top ${index} Locations`,string)
    .setColor('FF00AA')
    .setFooter("Last update")
    .setTimestamp(Date.parse(last_updated))

    msg.channel.send(embed)
}
