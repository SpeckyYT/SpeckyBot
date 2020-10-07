module.exports = {
    event: 'interval_1_min'
}

const os = require('os');

module.exports.call = (bot) => {
    const freeRAM = os.freemem();
    const usedRAM = os.totalmem() - freeRAM;

    const percent = 100 * usedRAM / (usedRAM + freeRAM);

    if(percent > 98){
        bot.log('REBOOT! REASON: RAM full');
        process.exit(0);
    }
}
