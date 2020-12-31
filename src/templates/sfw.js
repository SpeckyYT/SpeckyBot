const { sfw, nsfw } = new (require('nekos.life'))();
const animals = require('random-animals-api');

module.exports.sfw = ({methods,methodsNSFW}) =>
    function(bot,msg){
        function send(imgURL, poweredby){
            const embed = bot.embed().setImage(imgURL);
            if(poweredby) embed.setFooter("Powered by " + poweredby);
            return msg.channel.send(embed);
        }

        if(!methodsNSFW || msg.channel.topicSetting('no-nsfw') || msg.flag("sfw") || !msg.channel.nsfw){
            const method = Array.isArray(methods) ? methods.pick() : methods;

            return (sfw[method]||animals[method])()
            .then(img => send(img.url, sfw[method] ? "nekos.life" : null))
        }else{
            const method = Array.isArray(methodsNSFW) ? methodsNSFW.pick() : methodsNSFW;

            return nsfw[method]()
            .then(img => send(img.url))
        }
    }
