const { Message } = require('discord.js');

module.exports = bot => {

    Message.prototype.extend = function(){

        // Return if already extended
        if(this.extended) return this;

        /** The Cloned Message Object. */
        const msg = Object.assign(Object.create(Object.getPrototypeOf(this)), this);

        // Args
        msg.Args = msg.content.split(/\s|\n/g);
        msg.command = msg.Args[0].toLowerCase();
        while(msg.Args[0] == bot.config.prefix && msg.Args.length > 0){
            const fix = msg.Args[0] + msg.Args[1];
            msg.Args[1] = fix;
            msg.command = fix.toLowerCase();
            msg.Args = msg.Args.slice(1);
        }
        msg.Args = msg.Args.slice(1).clean();
        msg.args = msg.Args.toLowerCase();
        msg.ARGS = msg.Args.toUpperCase();


        // Content
        msg.cmdContent = msg.content
        .replace(/(\s?--[a-zA-Z]+\s?)+/g,' ').trim()
        .slice(bot.config.prefix.length).trim()
        .slice(msg.command.length-bot.config.prefix.length).trim();


        // Links
        msg.links = (msg.content ? msg.content.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g) : []) || []


        // Flags
        const flags = msg.content.toLowerCase().match(/--([a-z]+)/g);
        msg.flags = [];
        if(flags){
            msg.flags = flags.map(f=>f.slice(2)); // removes the "--" on the beginning
        }
        msg.hasFlag = (input) => {
            return msg.flags.includes(input.toLowerCase());
        }
        msg.flag = msg.hasFlag;


        // Safety if extending twice
        msg.extended = true;

        // Returns the new Message object
        return msg;
    }

}
