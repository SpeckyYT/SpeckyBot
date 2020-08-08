module.exports = {
    name: 'eval',
    aliases: ['evaluate','js']
}

const { inspect } = require('util')

module.exports.run = async (bot, data) => {
    const toEval = data.content;
    let result;
    try{
        result = inspect(eval(toEval),{depth:3}).success;
    }catch(err){
        result = err.toString().error;
    }

    console.log(result);
}
