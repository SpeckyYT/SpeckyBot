module.exports = {
    name: "serverinfo",
    description: "Informations about the server you're in!",
    category: `utilities`,
    aliases: ["si","serveri"]
}

module.exports.run = async (bot, msg) => {

    let bots = 0;
    let humans = 0;

    msg.guild.members.forEach(member => {
        if(member.user.bot){
            bots++;
        }else{
            humans++;
        }
    });

    const embed = bot.embed()
    .setAuthor(msg.author.username)
    .setDescription("These are the informations about the server you're in!")
    .setImage(msg.guild.iconURL)
    .addField("Server name", `${msg.guild.name}`)
    .addField("Server ID", `${msg.guild.id}`)
    .addField("Server region", `${msg.guild.region}`)
    .addField("Entering channel", `${msg.guild.systemChannel}`)
    .addField("Verification level", `${msg.guild.verificationLevel}`)
    .addField("Owner", `${msg.guild.owner} (${msg.guild.ownerID})`)
    .addField("Total Member count", `${msg.guild.memberCount}`,true)
    .addField("Human count", `${humans + "/" + (msg.guild.memberCount - bots)}`,true)
    .addField("Bot count", `${bots}`,true)
    .addField("Is the server large?", `${msg.guild.large}`)
    .addField("Created at", `${msg.guild.createdAt}`);
    msg.channel.send(embed);
}
