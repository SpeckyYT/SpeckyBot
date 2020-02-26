module.exports = msg => {
    if(msg.channel.topic){
        if(msg.channel.topic.toLowerCase().includes('[no-nsfw]')){
            return true;
        }else{
            return !msg.channel.nsfw;
        }
    }
}