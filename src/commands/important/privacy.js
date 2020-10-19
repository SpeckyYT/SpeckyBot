module.exports = {
    name: "privacy",
    description: "Do you feel uncertain using this bot?",
    category: "important"
}

module.exports.run = async (bot, msg) => {
    const botName = bot.user.username;
    const embed = bot.embed()
    .addField(
        `What data does ${botName} collect?`,
        `${botName} collects the following data:\n`+
        ['executed commands (guild ID, channel ID and user ID)'].map((v,i) => `${i+1}) ${v}`).join('\n')
    )
    .addField(
        `Why does ${botName} need this data?`,
        "The data is thoroughly collected for debugging purposes."
    )
    .addField(
        `Does ${botName} share any collected data?`,
        "No, the collected data won't get shared in any way to any third party activities."
    )
    .addField(
        `How can people contact ${botName} if they have concerns about the bot?`,
        `Just do ${bot.config.prefix}invite, join the support server and ask there.`
    )
    .addField(
        "Is the stored data permanent?",
        "No, the saved data isn't permanent."
    )
    return msg.channel.send(embed);
}
