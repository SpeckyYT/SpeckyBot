module.exports = async (bot, msg) => {
    if(!msg.channel.topic) return;

    let text = '[no-media]'
    let linkRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\\\/=]*)/g

    if(msg.channel.topic.toLowerCase().includes(text.toLowerCase())){
        let matches = msg.content.match(linkRegEx);

        if(msg.attachments.first()){
            msg.delete().catch();
        }else
        if(msg.embeds.length > 0){
            msg.delete().catch();
        }else
        if(matches){
            msg.delete().catch();
        }
    }
}

module.exports.config = {
    event: "message"
}
