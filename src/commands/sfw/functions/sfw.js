module.exports = msg => {
    if(msg.channel.topic ? msg.channel.topic.toLowerCase().includes('[no-nsfw]') : false){
        return true;
    }

    if(msg.flag("sfw")){
        return true;
    }

    return !msg.channel.nsfw;
}