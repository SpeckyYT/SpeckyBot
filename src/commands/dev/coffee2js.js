module.exports = {
    name: "coffee2js",
    description: "Compiles CoffeeScript to JavaScript!",
    usage: '<JavaScript code>',
    category: "dev",
    aliases: ["coffeescript2js",'coffeescript2javascript']
}

const coffeescript = require('coffeescript');
const { inspect } = require('util');

module.exports.run = async (bot, msg) => {
    try {
        const compiled = coffeescript.compile(
            msg.cmdContent,
            {
                bare: true,
            }
        );
        return msg.channel.send(compiled.code('js'))
    }catch(err){
        return msg.channel.send(inspect(err,false,1,false).code('js'))
    }
}
