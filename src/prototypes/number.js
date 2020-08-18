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

    Number.prototype.clamp = function (min, max) {
        return Math.min(Math.max(this, min), max);
    }

    Number.prototype.times = function(cb){
        if(typeof cb !== 'function') return;
        for(let i=0; i<Math.floor(this); i++){
            cb(i);
        }
    }

}
