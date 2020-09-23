const { MessageAttachment } = require('discord.js');

module.exports = (bot) => {
    Buffer.prototype.toAttachment = function(filename){
        return new MessageAttachment(this,filename||'file');
    }
}
