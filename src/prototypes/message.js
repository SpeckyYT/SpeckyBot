const { Message } = require('discord.js');

module.exports = bot => {

    Message.prototype.extend = function(){

        // Return if already extended
        if(this._extended) return this;

        /** The Cloned Message Object. */
        const msg = Object.assign(Object.create(Object.getPrototypeOf(this)), this);

        // Args
        msg.Args = msg.content.split(/\s+|\n+/g);
        msg.args = msg.Args.toLowerCase();
        msg.ARGS = msg.Args.toUpperCase();


        // Links
        msg.links = (msg.content ? msg.content.match(bot.regex.link) : []) || []


        // Client
        msg.client = msg.client || bot;

        // IDs
        msg.ids = msg.content.match(bot.regex.id) || [];

        // Safety if extending twice
        msg._extended = true;

        // Returns the new Message object
        return msg;
    }

    Message.prototype.cmdExtend = function(){

        // Return if already extended or not extended
        if(this._cmdExtended) return this;
        if(!this._extended) return this;

        /** The Cloned Message Object. */
        const msg = Object.assign(Object.create(Object.getPrototypeOf(this)), this);

        // Flags
        const flags = msg.content.toLowerCase().match(/--(\w+)/g);
        msg._flags = [];
        if(flags) msg._flags = flags.map(f=>f.slice(2)); // removes the "--" on the beginning
        msg.hasFlag = (input) => msg._flags.includes(input.toLowerCase());
        msg.flag = msg.hasFlag;

        // CMD Args
        msg.Args = msg.Args.filter(a => !a.match(/^--(\w+)$/));
        if(msg.Args[0] == bot.config.prefix){
            msg.Args[1] = msg.Args[0] + msg.Args[1];
            msg.Args = msg.Args.slice(1);
        }
        msg.Args = msg.Args.slice(1).clean();
        msg.args = msg.Args.toLowerCase();
        msg.ARGS = msg.Args.toUpperCase();

        // Safety if extending twice
        msg._cmdExtended = true;
        return msg;
    }

}
