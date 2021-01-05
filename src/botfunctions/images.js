const isImageUrl = require('is-image-url');

module.exports = (bot) => {
    bot.setLastImageCache = async (msg) => {
        function setImage(l){
            bot.cache.lastImage[msg.channel.id] = l;
        }

        await msg.channel.messages.fetch({limit: 50})
        .then(msgs => {
            msgs.array().reverse().some(message => {
                const matches = message.content.match(bot.regex.link);

                if(message.attachments.first()){
                    setImage(message.attachments.first().proxyURL);
                    return;
                }else
                if(matches){
                    let matchR
                    if(
                        matches.some(match => {
                            matchR = match;
                            if(isImageUrl(match)) return true;
                        })
                    ){
                        setImage(matchR);
                        return;
                    }
                }else
                if(message.embeds.length > 0){
                    try{
                        setImage(message.embeds[0].image.proxyURL);
                        return;
                    }catch(e){}
                    try{
                        setImage(message.embeds[0].thumbnail.proxyURL);
                        return;
                    }catch(e){}
                }
            })
        })
    }
}
