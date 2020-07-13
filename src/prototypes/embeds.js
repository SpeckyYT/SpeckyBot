const { MessageEmbed, RichEmbed } = require('discord.js');

module.exports = () => {

    MessageEmbed.prototype.toRichEmbed = function(){
        return new RichEmbed(this)
    }
    
}
