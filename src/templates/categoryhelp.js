module.exports.categoryhelp = ({category}) => {
    return function(bot,msg){
        if(!msg.author.id.isOwner() && !bot.checkCategory(category,msg)){
            return bot.cmdError("You don't have the permissions to look at the commands in this category")
        }
        return msg.channel.send(
            bot.embed()
            .setTitle('Help')
            .setDescription(
                `The bot prefix is: **${bot.config.prefix}**\n\n`+
                `❯ **${category.highFirst()}**\n`+
                bot.commands
                .filter(c => c.category == category)
                .map(c => `+ ${c.name}`)
                .join('\n')
                .code('diff')
            )
        );
    }
}
