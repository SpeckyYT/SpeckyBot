module.exports = {
    name: 'eval',
    aliases: ['evaluate','js']
}

const { inspect } = require('util')

module.exports.run = async (bot, data) => {
    const toEval = data.content;
    let result;
    try{
        result = inspect(eval(toEval),{depth:1}).toString().success;
    }catch(err){
        result = err.toString().error;
    }

    console.log(result);
}
