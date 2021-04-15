const { Permissions } = require('discord.js');

module.exports = bot => {

    Number.prototype.permissions = function(){
        return new Permissions(this);
    }

    Number.prototype.sleep = function(){
        return new Promise(resolve => bot.setTimeout(resolve, this));
    }
    Number.prototype.delay = Number.prototype.sleep;
    Number.prototype.wait = Number.prototype.sleep;
    Number.prototype.pause = Number.prototype.sleep;

    Number.prototype.clamp = function (min, max){
        let temp = this.valueOf();
        if(typeof min === "number") temp = Math.max(temp,min);
        if(typeof max === "number") temp = Math.min(temp,max);
        return temp;
    }

    Number.prototype.times = function(cb){
        if(typeof cb !== 'function') return;
        for(let i=0; i<Math.floor(this); i++){
            cb(i);
        }
    }
    Number.prototype.repeat = Number.prototype.times;

}
