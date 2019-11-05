const { readFileSync } = require('fs');
const { RichEmbed } = require('discord.js');

module.exports = (bot) => {
        let prompt = process.openStdin();
        prompt.addListener("data", res => {
            channel = readFileSync("../cnscnl.txt");
            let result = res.toString().trim().split(/ +/g);
            try{
                if(result.join(" ").includes('E:')){
                    const resnew = result.slice(1).join(" ");
                    const cEmbed = new RichEmbed()
                        .setAuthor(bot.user.username,bot.user.avatarURL)
                        .setDescription(resnew);
                    bot.channels.get(`${channel}`).send(result.join(" "))
                }else{
                    bot.channels.get(`${channel}`).send(result.join(" "));
                }
            }catch(e){
                console.log("Bot: Channel doesn't exist or bot doesn't have access to it")
            }
        });
}