module.exports = {
    name: "translate",
    description: "Can translate a sentence for you!",
    usage: `<text>`,
    category: `utilities`,
    accessableby: "Members",
    aliases: ["translator","trans","translat"]
}

const translate = require('translate');
const languageDetect = require('languagedetect');
const lngDetector = new languageDetect();
lngDetector.setLanguageType('iso2');

module.exports.run = async (bot, msg) => {
    if(!translate.key) translate.key = bot.config.yandex;

    const text = msg.Args.join(" ");
    if(!text) return bot.cmdError("You have to enter some text to translate!");

    const detected = lngDetector.detect(text);
    let prop;

    try{
        prop = detected[0][0];
    }catch(err){
        return bot.cmdError("Unknown language");
    }

    return await msg.channel.send(
        await translate(text,
        {
            from: prop,
            to: 'en',
            engine: 'yandex',
            key: bot.config.yandex
        })
    )
}
