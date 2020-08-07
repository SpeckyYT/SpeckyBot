const { Permissions } = require('discord.js');

module.exports = bot => {

    Number.prototype.permissions = function(){
        return new Permissions(this);
    }

    Number.prototype.sleep = function(){
        new Promise(resolve => setTimeout(resolve, this));
    }
    Number.prototype.delay = Number.prototype.sleep;
    Number.prototype.wait = Number.prototype.sleep;
    Number.prototype.pause = Number.prototype.sleep;

}
