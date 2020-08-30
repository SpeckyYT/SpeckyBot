const { Attachment } = require('discord.js');

module.exports = (bot) => {
    Buffer.prototype.toAttachment = function(filename){
        return new Attachment(this,filename||'file');
    }
}
