const { TextChannel } = require('discord.js');

module.exports = () => {

    TextChannel.prototype.topicSetting = function(string=''){
        return this.topic ? this.topic.toLowerCase().includes(`[${string}]`) : false;
    }

    String.prototype.topicSetting = function(string=''){
        return this.toLowerCase().includes(`[${string}]`);
    }

}
