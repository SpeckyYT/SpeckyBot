module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topic) return;

    const text = '[no-bots]'

    if(msg.channel.topic.toLowerCase().includes(text.toLowerCase())){
        if(msg.author.bot) msg.delete().catch(()=>{})
    }
}
