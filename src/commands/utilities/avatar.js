module.exports = {
    name: "avatar",
    description: "Wanna see your profile picture?",
    usage: `[@user]`,
    category: "utilities",
    aliases: ["a","ava"]
}

module.exports.run = async (bot, msg) => {
    let user;

    if(msg.mentions.users.size){
        user = msg.mentions.users.first();
    }else if(msg.Args[0]){
        await bot.users.fetch(msg.Args[0])
        .then(newUser => user = newUser)
        .catch(()=>{});
    }
    user = user || msg.author;

    const url = user.displayAvatarURL({format:'png',size:4096,dynamic:true});
    const embed = bot.embed()
    .setTitle(`${user.username}#${user.discriminator}`)
    .setImage(url)
    .setDescription(`[Link](${url})`);

    return msg.channel.send(embed);
}
