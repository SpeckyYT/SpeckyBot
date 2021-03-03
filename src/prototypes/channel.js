const { Channel } = require('discord.js');

module.exports = bot => {

    Channel.prototype.isNSFW = function(hard = false){
        return this.nsfw && (hard || !this.topicSetting('no-nsfw'))
    }

}
