module.exports = {
    name: "owofy",
    description: "This command tuwns yoww nyowmie text into an OwO text ( o͡ w o͡ )",
    usage: `<text>`,
    category: `misc`,
    aliases: ["uwufy"]
}

module.exports.run = async (bot, msg) => {
    if(msg.content){
        msg.channel.send(
            bot.owofy(msg.content)
        );
    }else{
        return bot.cmdError("You need to write some text behind the command UwU")
    }
}
