module.exports = async (bot, msg) => {
    if(msg.channel.type == 'dm') return;
    let s_settings = require('../../s_settings.json');
    if(s_settings) return;

}

module.exports.config = {
    event: "message"
}
