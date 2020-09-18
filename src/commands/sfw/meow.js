module.exports = {
    name: "meow",
    description: "Gives you a cat!",
    category: "sfw",
    aliases: ["miao","miau","miu","miav","meu","mjaullin","miauw","miaou","miar","mjao","mjaw","mijav","miob","meo","myau"]
}

module.exports.run = async (bot, msg) => {
    require('.\\functions\\img')('meow', msg);
}
