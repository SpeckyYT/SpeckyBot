module.exports = {
    name: "choose",
    description: "Bot will choose a random option from your text!",
    usage: `<option 1> | <option 2> | <option 3> | <etc>`,
    category: `utilities`,
    accessableby: "Members",
    aliases: []
}

module.exports.run = async (bot, msg) => {
    const { Args } = msg;
    const options = Args.join(" ").split('|');

    const option = options.pick()

    if(options.length < 2){
        msg.channel.send(`There isn't much to choose from, but I'll choose: \`${Args.join(' ') ? Args.join(' ') : " "}\``)
    }else{
        msg.channel.send(`I'll choose: \`${option.trim() ? option.trim() : ` `}\``)
    }
}
