module.exports = {
    name: 'eval',
    aliases: ['evaluate','js']
}

const { inspect } = require('util')

module.exports.run = async (bot, data) => {
    const toEval = data.content;
    let result;
    let error = false;
    try{
        result = inspect(eval(toEval),{depth:3});
    }catch(err){
        error = true;
        result = err.toString();
    }

    console.log(JSON.stringify(result,null,4)[error?'error':'success']);
}
