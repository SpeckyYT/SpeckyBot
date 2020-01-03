module.exports.run = async (bot, msg) => {
    require('./functions/img')('meow', msg);
}

module.exports.config = {
    name: "meow",
	description: "Gives you a cat!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ["miao","miau","miu","miav","meu","mjaullin","miauw","miaou","miar","mjao","mjaw","mijav","miob","meo","myau"]
}
