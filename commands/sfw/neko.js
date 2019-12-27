const Math = require('mathjs')

module.exports.run = async (bot, msg, args, config) => {
    if(Math.floor(Math.random(0,2))){
        neko.sfw.neko().then(imgURL => {
            require('./functions/embed')('neko', msg)
        })
    }else{
        neko.sfw.nekoGif().then(imgURL => {
            require('./functions/embed')('nekoGif',msg)
        })
    }
}

module.exports.config = {
    name: "neko",
	description: "Gives you a neko!",
    usage: ``,
    category: `sfw`,
	accessableby: "Members",
    aliases: ["nya","nyan"]
}
