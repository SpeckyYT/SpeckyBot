module.exports = {
    name: "discrim",
    description: "You want to change your discriminator without Nitro?",
    usage: `[discriminator]`,
    category: `utilities`,
    aliases: ["discrims","discriminator","discriminators","discrimin","discrimins"]
}

module.exports.run = async (bot, msg) => {
    const { args } = msg;
    let discriminator = msg.author.discriminator.padStart(4,"0");
    if(args[0]){
        if(!isNaN(args[0])){
            if(discriminator <= 9999 && discriminator >= 0){
                discriminator = args[0].padStart(4,"0")
            }
        }
    }
    const discrims = [];
    bot.users.forEach(user => {
        if(discrims.length < 10){
            if(discriminator == user.discriminator && msg.author.username != user.username){
                discrims.push(user.tag)
            }
        }
    })
    const embed = bot.embed()
    .setTitle(`#${discriminator}`)
    .setDescription(discrims.length ? discrims.join(`\n`) : 'No user found')
    msg.channel.send(embed);
}
