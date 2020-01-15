module.exports = async (bot, msg) => {
    if(!msg.channel.topic) return;
    if(msg.author.bot) return;
    let text = 'Next number: '
    if(msg.channel.topic.toLowerCase().startsWith(text.toLowerCase())){
        let number = parseInt(msg.channel.topic.slice(text.length).trim());
        msg.channel.fetchMessages({limit: 1})
        .then(msgl => {
            if(msgl.first().mentions.users.id == msg.author.id) return;
            if(msg.id > msgl.first().id && msg.author.id != msgl.first().author.id){
                if(Number(msgl.first().content.split(" ")[0]) < Number(msg.content) && Number(msg.content) < number)
                msg.channel.send(`${Number(msg.channel.topic.split(" ").slice(2)[0]) - 1} ${msg.author.toString()}`)
            }
        })
    }
}

module.exports.config = {
    event: "messageDelete"
}
