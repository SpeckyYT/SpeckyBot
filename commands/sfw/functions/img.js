const { RichEmbed } = require('discord.js');
const client = require('nekos.life');
const animals = require('random-animals-api'); 
const { sfw } = new client();

module.exports = async (method, msg) => {

    let sendt, user;
    let mention = msg.mentions.users.first();

    if(mention){
        mention = mention.toString();
    }
    user = msg.author.toString();

    if(mention && mention != user){

        switch(method){

            case "smug":
                sendt = `${user} is being smug against ${mention}`; break;
            case "baka":
                sendt = `${user} says that ${mention} is a baka`; break;
            case "tickle":
                sendt = `${user} just tickled ${mention}`; break;
            case "slap":
                sendt = `${user} just slapped ${mention}`; break;
            case "poke":
                sendt = `${mention} got poked by ${user}`; break;
            case "pat":
                sendt = `${user} is patting ${mention}`; break;
            case "neko":
            case "nekoGif":
                sendt = `${user} wants you to have some cute cat girls ${mention}`; break;
            case "meow":
                sendt = `${user} would like you to have some cute cats ${mention}`; break;
            case "lizard":
                sendt = `${user} just called ${mention} a lizard`; break;
            case "kiss":
                sendt = `${user} just kissed ${mention}`; break;
            case "hug":
                sendt = `${user} likes ${mention} a lot and gives him a hug`; break;
            case "foxGirl":
                sendt = `${user} thinks that ${mention} doesn't have enough fox girls`; break;
            case "feed":
                sendt = `${user} just fed ${mention}`; break;
            case "cuddle":
                sendt = `${user} cuddles ${mention}`; break;
            case "kemonomimi":
                sendt = `${user} gave some animal humans to ${mention}`; break;
            case "holo":
                sendt = `${user} likes Holo a lot, so ${mention} should like her in the same way`; break;
            case "woof":
                sendt = `${user} has enough dogs and gave one one to ${mention}`; break;
        }

    }else{

        switch(method){

            case "smug":
                sendt = `${user} is looking a bit smug`; break;
            case "baka":
                sendt = `${user} is a baka`; break;
            case "tickle":
                sendt = `${user} has been tickled by me`; break;
            case "slap":
                sendt = `${user} just slapped himself`; break;
            case "poke":
                sendt = `${user} got poked by me`; break;
            case "pat":
                sendt = `There, I will pat you ${user}`; break;
            case "neko":
            case "nekoGif":
                sendt = `Have some cute cat girls ${user}`; break;
            case "meow":
                sendt = `Have some cute cats ${user}`; break;
            case "lizard":
                sendt = `Have a lizard ${user}`; break;
            case "kiss":
                sendt = `${user} just kissed himself`; break;
            case "hug":
                sendt = `I will hug you ${user}, don't worry`; break;
            case "foxGirl":
                sendt = `Have some cute fox girls ${user}`; break;
            case "feed":
                sendt = `You're hungry ${user}, right?`; break;
            case "cuddle":
                sendt = `${user} is getting cuddled my me`; break;
            case "kemonomimi":
                sendt = `Have some animal humans ${user}`; break;
            case "holo":
                sendt = `Have an image of Holo ${user}`; break;
            case "woof":
                sendt = `Have some cute dogs ${user}`; break;
        }

    }

    function send(imgURL, poweredby){
        let embed = new RichEmbed()
        .setImage(imgURL)
        .setColor('FF00AA');
        if(poweredby) embed.setFooter("Powered by " + poweredby);
        if(sendt) embed.setDescription(sendt);
        return msg.channel.send(embed);
    }

    if(sfw[method]){
        sfw[method]().then(async img => {
            send(img.url, "nekos.life")
        })
    }else if(animals[method]){
        animals[method]().then(async imgURL => {
            send(imgURL, "")
        })
    }else{
        msg.channel.send('This should never happen.\nBut if it happens, wish Specky a good day.')
    }
}