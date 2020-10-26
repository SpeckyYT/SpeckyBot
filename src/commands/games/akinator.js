const { Aki, regions } = require('aki-api');

module.exports = {
    name: "akinator",
    description: "Lets you play with akinator!",
    usage: `<${regions.join('/')}>`,
    category: "games",
    aliases: ["aki"]
}

module.exports.run = async (bot, msg) => {
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

    await Promise.all([
        aki.start(),
        ...Object.values(answers)
        .map(r => message.react(r))
    ])

    message.edit(
        bot.embed()
        .setTitle("Akinator")
        .setDescription(aki.question)
    )

    const collector = message.createReactionCollector((r,user) => user.id == msg.author.id && Object.values(answers).includes(r.emoji.name));
    collector.on('collect', async r => {
        await aki.step(
            Object.keys(answers)[Object.values(answers).indexOf(r.emoji.name)]
        );
        if(aki.progress > 80){
            await aki.win()
            const guess = aki.answers.last();
            message.edit(
                bot.embed()
                .setTitle("Akinator")
                .addField("My Guess", guess.name)
                .setImage(guess.absolute_picture_path)
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
