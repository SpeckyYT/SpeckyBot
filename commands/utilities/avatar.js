const { RichEmbed } = require('discord.js')

module.exports.run = async (bot, msg) => {
    let user;
    
    if(msg.mentions.users.first()){

        user = msg.mentions.users.first();

    }else if(msg.Args[0]){

        msg.guild.fetchMember(msg.Args[0])
        .then(member => {
            user = member.user
        })
    }

    if(typeof user == "undefined"){
        user = msg.author;
    }

    msg.channel.send(
        new RichEmbed()
        .setTitle(`${user.username}#${user.discriminator}`)
        .setImage(user.avatarURL)
        .setDescription(`[Link](${user.avatarURL})`)
    )
}

module.exports.config = {
    name: "avatar",
	description: "Wanna see your profile picture?",
    usage: `[@user]`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["a","ava"]
}