const promisify = require('promisify-func');
const { validate, schedule } = require('node-cron');
const { EventEmitter } = require('events');

module.exports = (bot) => {
    process.removeAllListeners();
    bot.removeAllListeners();
    bot.cache.schedules.forEach(s => s.stop()); // ! destroy doesn't work now
    bot.cache.schedules = [];

    global.modules.loader(bot, 'events', ({filePath}) => {
        const data = bot.require(filePath);
        const evts = Array.isArray(data) ? data : [data];

        for(const evt of evts){
            let eName = evt.event;
            if(!eName) throw new Error("Event not found!".toUpperCase());
            const calltype = evt.type == "once" ? "once" : "on";
            const emi = (evt.emitter || 'bot').toLowerCase();
            if(!Array.isArray(eName)) eName = [eName];
            for(let event of eName){
                let emitter;
                switch(emi){
                    case 'process':
                        emitter = process; break;
                    case 'bot':
                        emitter = bot; break;
                    case 'music':
                        emitter = bot.music; break;
                }
                if(!(emitter instanceof EventEmitter)){
                    throw new Error("Event Emitter not found!");
                }
                if(validate(event)){
                    if(!emitter.eventNames().includes(event)){
                        bot.cache.schedules.push(
                            schedule(
                                event,
                                () => emitter.emit(event),
                                {
                                    timezone: evt.timezone
                                }
                            )
                        );
                    }
                }
                emitter[calltype](event, promisify(bot.getFunction(evt).bind(null, bot)));
            }
        }
    })
};
