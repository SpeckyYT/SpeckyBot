module.exports = {
    event: '*/15 * * * * *'
}

const os = require('os');

module.exports.call = async (bot) => {
    const freeRAM = os.freemem();
    const usedRAM = os.totalmem() - freeRAM;

    const percent = 100 * usedRAM / (usedRAM + freeRAM);

    if(percent > 98){
        await bot.log('REBOOT! REASON: RAM full'.fatal);
        process.exit(0);
    }
}
