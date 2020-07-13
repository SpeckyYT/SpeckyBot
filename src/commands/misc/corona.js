module.exports = {
    name: "corona",
    description: "Gives you how many people are infected by corona!",
    usage: `[number]`,
    category: `misc`,
    aliases: ["coronavirus","covid","covid19","covid-19"]
}

const fetch = require('node-fetch');
const { RichEmbed, Collection } = require('discord.js');

const API1 = 'https://coronavirus-tracker-api.herokuapp.com/confirmed';
const API2 = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22confirmed%22%7D%2C%20%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22deaths%22%7D%2C%20%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22recovered%22%7D%5D';

module.exports.run = async (bot, msg) => {
    const APIs = await Promise.all([
        fetch(API1, {headers: {Accept: 'application/json'}}),
        fetch(API2, {headers: {Accept: 'application/json'}})
    ]);
    const JSONs = await Promise.all([
        APIs[0].json(),
        APIs[1].json()
    ])
    const {last_updated,latest,locations} = JSONs[0];
    const {features}                      = JSONs[1];

    // API1
    let top = new Collection();
    const topmax = isNaN(msg.args[0]) ? 5 : (msg.args[0] < 5 ? 5 : msg.args[0]);

    locations.forEach(object => {
        const t = top.get(object.country);
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

    // API2
    const stats = {confirmed:0,deaths:0,recovered:0}
    features.forEach(obj => {
        stats.recovered += obj.attributes.recovered
        stats.confirmed += obj.attributes.confirmed
        stats.deaths += obj.attributes.deaths
    })

    const embed = new RichEmbed()
    .setTitle('CoronaVirus Outbreak')
    .addField("✅ Total confirmed cases",`${latest} cases`)
    .addField("💀 Total deaths", `${stats.deaths} humans`)
    .addField("🔁 Total Recovered", `${stats.recovered} people`)
    .addField(`Top ${index} Locations`,string)
    .setColor(bot.config.color)
    .setFooter("Last update")
    .setTimestamp(Date.parse(last_updated));

    return msg.channel.send(embed);
}
