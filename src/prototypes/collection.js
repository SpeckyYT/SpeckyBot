const { Collection } = require('discord.js');

module.exports = () => {

    Collection.prototype.toObject = function(){
        const obj = new Object();
        this.forEach((v,p) => {
            obj[p] = v;
        })
        return obj;
    }
    
}
