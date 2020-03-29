module.exports = {
    name: "dadjoke",
	description: "Gives you a dad joke!",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: ["dadjokes"]
}

const fetch = require('node-fetch')
const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    let API = 'https://icanhazdadjoke.com/';

    let res = await fetch(API, {headers: {Accept: 'application/json'}})
    let data = await res.json()
    let joke = data.joke

    let embed = new RichEmbed()
    .setTitle('Dad Joke!')
    .setDescription(joke)
    .setColor('FF00AA')

    msg.channel.send(embed)
}
