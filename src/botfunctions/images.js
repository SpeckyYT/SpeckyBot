const isImageUrl = require('is-image-url');

module.exports = (bot) => {
    bot.setLastImageCache = async (msg) => {
        const linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g

        function setImage(l){
            bot.cache.lastImage[msg.channel.id] = l;
        }

        await msg.channel.fetchMessages({limit: 50})
        .then(msgs => {
            msgs.array().reverse().some(message => {
                const matches = message.content.match(linkRegex);

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
