module.exports = msg => {
    if(msg.channel.topicSetting('no-nsfw')){
        return true;
    }

    if(msg.flag("sfw")){
        return true;
    }

    return !msg.channel.nsfw;
}
