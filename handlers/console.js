const { readFileSync } = require('fs');

module.exports = (bot) => {
        let prompt = process.openStdin();
        prompt.addListener("data", res => {
            channel = readFileSync("../cnscnl.txt");
            let result = res.toString().trim().split(/ +/g);
            try{
                bot.channels.get(`${channel}`).send(result.join(" "));
            }catch(e){
                console.log("Bot: Channel doesn't exist or bot doesn't have access to it")
            }
        });
}