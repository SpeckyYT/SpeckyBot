const { Aki, regions } = require('aki-api');

module.exports = {
    name: "akinator",
    description: "Lets you play with akinator!",
    usage: `<${regions.join('/')}>`,
    category: "games",
    aliases: ["aki"]
}

module.exports.run = async (bot, msg) => {
    // return bot.cmdError('Bro, this command is not fully implemented now')
    if(!regions.includes(msg.args[0])){
        return bot.cmdError(`You have to enter a valid region\nAvailable regions: \`${regions.join(', ')}\``)
    }

    const answers = {
        yes: "✅",
        probably: "☑️",
        dontknow: "❓",
        probablynot: "🇽",
        no: "❎"
    }

    const aki = new Aki(msg.args[0]);

    const message = await msg.channel.send(
        bot.embed()
        .setTitle("Akinator")
        .setDescription("Loading...")
    );

    const promises = [];

    promises.push(aki.start());
    for(let a in answers){
        if(typeof answers[a] == "string"){
            promises.push(message.react(answers[a]))
        }
    }

    await Promise.all(promises);

    message.edit(
        bot.embed()
        .setTitle("Akinator")
        .setDescription(aki.question)
    )

    const collector = message.createReactionCollector(r => r.users.has(msg.author.id) && Object.values(answers).includes(r.emoji.name));
    collector.on('collect', async r => {
        await aki.step(
            Object.keys(answers)[Object.values(answers).indexOf(r.emoji.name)]
        );
        if(aki.progress > 75){
            await aki.win()
            message.edit(
                bot.embed()
                .setTitle("Akinator")
                .addField("My Guess", aki.answers[0].name)
                .setImage(aki.answers[0].absolute_picture_path)
            )
            collector.stop()
        }else{
            message.edit(
                bot.embed()
                .setTitle("Akinator")
                .setDescription(aki.question)
            )
        }
    });
}
