module.exports = {
    event: "cleanMessage"
}

module.exports.call = async (bot, msg) => {
    return; // probably this will do something soon™

    // MESSAGES/RESPONSES
    if(msg.guild.me.hasPermission('SEND_MESSAGES')){}

    // OTHER
    if(msg.guild.me.hasPermission('MANAGE_MESSAGES')){}
}
