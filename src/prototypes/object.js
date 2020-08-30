const { Collection } = require('discord.js');

module.exports = () => {

    // HAS ISSUES WITH SUPERAGENT AND MATHJS
    Object.prototype.getFunction = function(){
        return this[Object.keys(this).filter(v => typeof this[v] == 'function')[0]] || (async ()=>{});
    }

    Object.prototype.toCollection = function(){
        const obj = new Collection();
        for(const prop in this){
            if(Object.prototype[prop]) continue;
            obj.set(prop,this[prop]);
        }
        return obj;
    }

}
