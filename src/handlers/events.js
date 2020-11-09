const promisify = require('promisify-func');

module.exports = async (bot) => {
    bot.removeAllListeners();
    process.removeAllListeners();

    global.modules.loader(bot, 'events', ({filePath}) => {
        const evt = bot.require(filePath);
        let eName = evt.event;
        if(!eName) throw new Error("Event not found!".toUpperCase());
        const calltype = evt.type == "once" ? "once" : "on";
        const emitter = evt.emitter || 'bot';
        if(!Array.isArray(eName)) eName = [eName];
        for(let event of eName){
            let emit;
            switch(emitter){
                case 'process':
                    emit = process; break;
                case 'bot':
                    emit = bot; break;
                default:
                    throw new Error("Event Emitter not found!");
            }
            emit[calltype](event, promisify(bot.getFunction(evt).bind(null, bot)));
        }
    })
};
