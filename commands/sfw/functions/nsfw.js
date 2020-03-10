module.exports = msg => {
    if(msg.channel.topic){
        if(msg.channel.topic.toLowerCase().includes('[no-nsfw]')){
            return true;
        }
    }
    return !msg.channel.nsfw;
}