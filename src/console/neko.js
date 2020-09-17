module.exports = {
    name: 'neko',
    aliases: ['nyan','nya','nekos','nekos.life']
}

let sfw,met;

const { join } = require('path');
const neko = new (require('nekos.life'))();

const execute = async (bot,f) => {
    if(f){
        f()
        .then(async img => {
            require(join(__dirname,'functions','drawbuffer'))(bot,img.url);
        })
    }else{
        console.log(`${sfw}/${met} doesn't exist`.error);
    }
}

module.exports.run = async (bot, data) => {
    sfw = data.args[0] ? (data.args[0].includes('sfw') ? data.args[0] : (neko.sfw[data.args[0]] ? 'sfw' : (neko.nsfw[data.args[0]] ? 'nsfw' : 'sfw'))) : 'sfw';
    met = data.args[0] ? (!data.args[0].includes('sfw') ? data.args[0] : (data.Args[1] ? data.Args[1] : 'neko')) : 'neko';
    await execute(bot,neko[sfw][met]);
}
