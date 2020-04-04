module.exports = {
    name: 'corona',
    aliases: ['coronavirus']
}

const fetch = require('node-fetch');
const { Collection } = require('discord.js');
const API = 'https://coronavirus-tracker-api.herokuapp.com/confirmed';

module.exports.run = async (bot, data) => {
    let { locations } = await (await fetch(API, {headers: {Accept: 'application/json'}})).json();

    let top = new Collection();
    let topmax = isNaN(data.args[0]) ? 10 : (data.args[0] < 10 ? 10 : data.args[0]);

    locations.forEach(object => {
        let t = top.get(object.country);
        if(t){
            top.set(object.country, object.latest + t);
        }else{
            top.set(object.country, object.latest);
        }
    })
    top = top.sort((a,b) => b-a);
    while(top.size > topmax){
        top.delete(top.keyArray()[top.size-1]);
    }
    console.table(top);
}