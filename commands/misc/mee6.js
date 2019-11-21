const fetch = require('node-fetch')
const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg, args, config) => {

    var baseURL = `https://mee6.xyz/api/plugins/levels/leaderboard/`

    fetch(`${baseURL}${args[0]}`)
        .then(resp => resp.json())
        .then(json => {
            msg.channel.send(json.page)
        })
}

module.exports.config = {
    name: "mee6",
	description: "Gives informations from MEE6's leaderboard!",
    usage: `<"server / roles / xp"> <serverID> [userID]`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["status","st"]
}