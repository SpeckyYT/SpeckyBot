module.exports = {
    event: "cleanMessage"
}

module.exports.call = async (bot, msg) => {
    return; // probably this will do something soon™

    // MESSAGES/RESPONSES
    if(msg.guild.me.permissions.has(2048n)){}

    // OTHER
    if(msg.guild.me.permissions.has(8192n)){}
}
