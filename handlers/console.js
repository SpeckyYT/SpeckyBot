const { readFileSync } = require('fs');

module.exports = (bot) => {
    let prompt = process.openStdin();
    prompt.addListener("data", res => {
        channel = readFileSync("../cnscnl.txt");
        let result = res.toString().trim().split(/ +/g);
        bot.channels.get(`${channel}`).send(result.join(" "));
    });
}