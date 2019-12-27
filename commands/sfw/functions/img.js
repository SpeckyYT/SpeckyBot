const { RichEmbed } = require('discord.js')
const client = require('nekos.life');
const { sfw } = new client();

module.exports = async (method, msg) => {

    let sent, user;
    let mention = msg.mentions.users.first();

    if(mention){
        mention = mention.toString();
    }
    user = msg.author.toString();

    if(mention && mention != user){

        switch(method){

            case "smug":
                sent = `${user} is being smug against ${mention}`; break;
            case "baka":
                sent = `${user} says that ${mention} is a baka`; break;
            case "tickle":
                sent = `${user} just tickled ${mention}`; break;
            case "slap":
                sent = `${user} just slapped ${mention}`; break;
            case "poke":
                sent = `${mention} got poked by ${user}`; break;
            case "pat":
                sent = `${user} is patting ${mention}`; break;
            case "neko":
            case "nekoGif":
                sent = `${user} wants you to have some cute cat girls ${mention}`; break;
            case "meow":
                sent = `${user} would like you to have some cute cats ${mention}`; break;
            case "lizard":
                sent = `${user} just called ${mention} a lizard`; break;
            case "kiss":
                sent = `${user} just kissed ${mention}`; break;
            case "hug":
                sent = `${user} likes ${mention} a lot and gives him a hug`; break;
            case "foxGirl":
                sent = `${user} thinks that ${mention} doesn't have enough fox girls`; break;
            case "feed":
                sent = `${user} just fed ${mention}`; break;
            case "cuddle":
                sent = `${user} cuddles ${mention}`; break;
            case "kemonomimi":
                sent = `${user} gave some animal humans to ${mention}`; break;
            case "holo":
                sent = `${user} likes Holo a lot, so ${mention} should like her in the same way`; break;
            case "woof":
                sent = `${user} has enough dogs and gave one one to ${mention}`; break;
        }

    }else{

        switch(method){

            case "smug":
                sent = `${user} is looking a bit smug`; break;
            case "baka":
                sent = `${user} is a baka`; break;
            case "tickle":
                sent = `${user} has been tickled by me`; break;
            case "slap":
                sent = `${user} just slapped himself`; break;
            case "poke":
                sent = `${user} got poked by me`; break;
            case "pat":
                sent = `There, I will pat you ${user}`; break;
            case "neko":
            case "nekoGif":
                sent = `Have some cute cat girls ${user}`; break;
            case "meow":
                sent = `Have some cute cats ${user}`; break;
            case "nekoGif":
                sent = `Have a lizard ${user}`; break;
            case "kiss":
                sent = `${user} just kissed himself`; break;
            case "hug":
                sent = `I will hug you ${user}, don't worry`; break;
            case "foxGirl":
                sent = `Have some cute fox girls ${user}`; break;
            case "feed":
                sent = `You're hungry ${user}, right?`; break;
            case "cuddle":
                sent = `${user} is getting cuddled my me`; break;
            case "kemonomimi":
                sent = `Have some animal humans ${user}`; break;
            case "holo":
                sent = `Have an image of Holo ${user}`; break;
            case "woof":
                sent = `Have some cute dogs ${user}`; break;
        }

    }

    sfw[method]().then(async imgURL => {
        let embed = new RichEmbed()
        .setImage(imgURL.url)
        .setFooter("Powered by nekos.life")
        .setColor('FF00AA');
        if(sent) embed.setDescription(sent);
        return msg.channel.send(embed);
    })
}