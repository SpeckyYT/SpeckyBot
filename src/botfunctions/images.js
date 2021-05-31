const isImageUrl = require('is-image-url');

module.exports = (bot) => {
    bot.setLastImageCache = async (msg) => {
        const setImage = l => bot.cache.lastImage[msg.channel.id] = l;

        const msgs = await msg.channel.messages.fetch({limit: 50});

        msgs
        .array()
        .some(message => {
            const matches = message.content.match(bot.regex.link);
            if(message.attachments.first()){
                return setImage(message.attachments.first().proxyURL);
            }else if(matches){
                const match = matches.find(match => isImageUrl(match));
                if(match) return setImage(match);
            }else if(message.embeds.length > 0 && message.embeds[0]){
                if(message.embeds[0].image)
                    return setImage(message.embeds[0].image.proxyURL);
                if(message.embeds[0].thumbnail)
                    return setImage(message.embeds[0].thumbnail.proxyURL);
            }
        })
    }
}
