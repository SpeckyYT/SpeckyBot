module.exports = {
    name: 'eval',
    aliases: ['evaluate','js']
}

const { inspect } = require('util')

module.exports.run = async (bot, args) => {
    let toEval = args.join(" ");
    let result;
    try{
        result = inspect(eval(toEval)).toString().success;
    }catch(err){
        result = err.toString().error;
    }

    console.log(result);
}
