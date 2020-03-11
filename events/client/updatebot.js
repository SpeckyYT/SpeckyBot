module.exports = {
    event: "interval_1_sec"
}

module.exports.call = async bot => {
    try{
        bot.embed.timestamp = Math.ceil(new Date().getTime() / 1000) * 1000;
    }catch(err){}
}