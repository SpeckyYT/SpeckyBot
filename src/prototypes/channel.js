const { Channel } = require('discord.js');

module.exports = bot => {

    Channel.prototype.isNSFW = function(){
        return this.nsfw && !this.topicSetting('no-nsfw')
    }

}
