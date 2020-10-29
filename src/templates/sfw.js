const { sfw, nsfw } = new (require('nekos.life'))();
const animals = require('random-animals-api');

module.exports.sfw = ({methods,methodsNSFW}) =>
    function(bot,msg){
        function send(imgURL, sendt, poweredby){
            const embed = bot.embed().setImage(imgURL);
            if(poweredby) embed.setFooter("Powered by " + poweredby);
            if(sendt) embed.setDescription(sendt);
            return msg.channel.send(embed);
        }

        if(!methodsNSFW || msg.channel.topicSetting('no-nsfw') || msg.flag("sfw") || !msg.channel.nsfw){
            const method = Array.isArray(methods) ? methods.pick() : methods;

            let sendt, user, mention = msg.mentions.users.first();

            if(mention){
                mention = mention.toString();
            }
            user = msg.author.toString();

            if(mention && mention != user){

                switch(method){

                    case "baka": sendt = `${user} says that ${mention} is a baka`; break;
                    case "coffee": sendt = `${user} wants that ${mention} drinks a coffee`; break;
                    case "cuddle": sendt = `${user} cuddles ${mention}`; break;
                    case "feed":
                    case "food": sendt = `${user} just fed ${mention}`; break;
                    case "foxGirl": sendt = `${user} thinks that ${mention} doesn't have enough fox girls`; break;
                    case "holo": sendt = `${user} likes Holo a lot, so ${mention} should like her in the same way`; break;
                    case "hug": sendt = `${user} likes ${mention} a lot and gives him a hug`; break;
                    case "kemonomimi": sendt = `${user} gave some animal humans to ${mention}`; break;
                    case "kiss": sendt = `${user} just kissed ${mention}`; break;
                    case "lizard": sendt = `${user} just called ${mention} a lizard`; break;
                    case "meow": sendt = `${user} would like you to have some cute cats ${mention}`; break;
                    case "neko":
                    case "nekoGif": sendt = `${user} wants you to have some cute cat girls ${mention}`; break;
                    case "pat": sendt = `${user} is patting ${mention}`; break;
                    case "poke": sendt = `${mention} got poked by ${user}`; break;
                    case "slap": sendt = `${user} just slapped ${mention}`; break;
                    case "smug": sendt = `${user} is being smug against ${mention}`; break;
                    case "tickle": sendt = `${user} just tickled ${mention}`; break;
                    case "woof": sendt = `${user} has enough dogs and gave one one to ${mention}`; break;
                }

            }else{

                switch(method){

                    case "baka": sendt = `${user} is a baka`; break;
                    case "coffee": sendt = `Do you want some coffee ${user}?`; break;
                    case "cuddle": sendt = `${user} is getting cuddled my me`; break;
                    case "feed":
                    case "food": sendt = `You're hungry ${user}, right?`; break;
                    case "foxGirl": sendt = `Have some cute fox girls ${user}`; break;
                    case "holo": sendt = `Have an image of Holo ${user}`; break;
                    case "hug": sendt = `I will hug you ${user}, don't worry`; break;
                    case "kemonomimi": sendt = `Have some animal humans ${user}`; break;
                    case "kiss": sendt = `${user} just kissed himself`; break;
                    case "lizard": sendt = `Have a lizard ${user}`; break;
                    case "meow": sendt = `Have some cute cats ${user}`; break;
                    case "neko":
                    case "nekoGif": sendt = `Have some cute cat girls ${user}`; break;
                    case "pat": sendt = `There, I will pat you ${user}`; break;
                    case "poke": sendt = `${user} got poked by me`; break;
                    case "slap": sendt = `${user} just slapped himself`; break;
                    case "smug": sendt = `${user} is looking a bit smug`; break;
                    case "tickle": sendt = `${user} has been tickled by me`; break;
                    case "woof": sendt = `Have some cute dogs ${user}`; break;
                }

            }

            return (sfw[method]||animals[method])()
            .then(img => send(img.url, sendt, sfw[method] ? "nekos.life" : null))
        }else{
            const method = Array.isArray(methodsNSFW) ? methodsNSFW.pick() : methodsNSFW;

            return nsfw[method]()
            .then(img => send(img.url))
        }
    }
