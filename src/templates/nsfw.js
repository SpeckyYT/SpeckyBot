const { MessageEmbed } = require('discord.js');
const { nsfw } = new (require('nekos.life'))();

module.exports.nsfw = ({methods}) =>
    async function(bot,msg){
        const method = Array.isArray(methods) ? methods.pick() : methods;
        return msg.channel.send(
            await nsfw[method]()
            .then(img => new MessageEmbed().setImage(img.url))
        )
    }
