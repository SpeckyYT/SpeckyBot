{ MessageAttachment } = require('discord.js');

module.exports = (bot) ->
    Buffer::toAttachment = (filename) ->
        new MessageAttachment(@,filename||'file')
