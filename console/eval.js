module.exports = {
    name: 'eval',
    aliases: ['evaluate','js']
}

const { inspect } = require('util')

module.exports.run = async (bot, data) => {
    let toEval = data.content;
    let result;
    try{
        result = inspect(eval(toEval)).toString().success;
    }catch(err){
        result = err.toString().error;
    }

    console.log(result);
}
