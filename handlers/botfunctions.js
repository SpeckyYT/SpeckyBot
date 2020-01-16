const isImageUrl = require('is-image-url');

module.exports = async (bot) => {

    bot.msToVars = (ms = 0, keep = false) => {
        if(ms < 0){
            ms = (-ms)
        }
        let mil   = Math.floor(ms);
        let sec   = Math.floor(ms /  1000);
        let min   = Math.floor(ms / (1000 * 60));
        let hrs   = Math.floor(ms / (1000 * 60  * 60));
        let day   = Math.floor(ms / (1000 * 60  * 60  * 24));
        let month = Math.floor(ms / (1000 * 60  * 60  * 24 * 30));
        let year  = Math.floor(ms / (1000 * 60  * 60  * 24 * 30 * 12));

        if(!keep){
            mil = mil % 1000;
            sec = sec % 60;
            min = min % 60;
            hrs = hrs % 24;
            day = day % 30;
            month = month % 12;
        }

        return {mil,sec,min,hrs,day,month,year}
    }


    bot.msToTime = (ms) => {
        let {mil,sec,min,hrs,day} = bot.msToVars(ms);
        return `${day.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(1, "0")}s ${mil.padStart(3, "0")}ms`
    }


    bot.formatTime = (ms) => {
        let {sec,min,hrs,day} = bot.msToVars(ms);

        if(day > 0){
            return `${day} Day${(day == 1) ? '' : 's'}`
        }else if(hrs > 0){
            return `${hrs} Hour${(hrs == 1) ? '' : 's'}`
        }else if(min > 0){
            return `${min} Minute${(min == 1) ? '' : 's'}`
        }else{
            return `${sec} Second${(sec == 1) ? '' : 's'}`
        }
    }


    bot.getChannel = (input, guild) => {
        let ch;
        ch = guild.channels.find( item => {
            try{
                return item.name.toLowerCase() === input.toLowerCase()
            }catch(err){
                return null
            }});
        if( ch != null && typeof ch != undefined) {
            return ch
        }
        ch = guild.channels.get(input);
        if(typeof ch != null && typeof ch != undefined){
            return ch
        }
        return input;
    }


    bot.highFirst = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    bot.debug = () => {
        console.log(bot.debugN++)
    }


    bot.resetDebug = () => {
        bot.debugN = 0;
    }


    bot.setLastImageCache = async (msg) => {
        let linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g

        function setImage(input){
            bot.cache.lastImage[msg.channel.id] = input;
        }

        await msg.channel.fetchMessages({limit: 25})
        .then(msgs => {
            msgs.array().reverse().some(message => {
                let matches = message.content.match(linkRegex);

                if(message.attachments.first()){
                    setImage(message.attachments.first().proxyURL);
                    return;
                }else
                if(matches){
                    let matchR
                    if(
                        matches.some(match => {
                            matchR = match;
                            if(isImageUrl(match)) return true;
                        })
                    ){
                        setImage(matchR);
                        return;
                    }
                }else
                if(message.embeds){
                    try{
                        setImage(message.embeds[0].image.proxyURL);
                        return;
                    }catch(e){}
                    try{
                        setImage(message.embeds[0].thumbnail.proxyURL);
                        return;
                    }catch(e){}
                }
            })
        })
    }


    bot.checkOwner = (id) => {
        return bot.config.owner.includes(id)
    }


    bot.sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    bot.delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    bot.wait = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    bot.singPlur = (variable, string) => {
        return `${variable} ${string}${variable == 1 ? '' : 's'}`
    }


    bot.cmdError = (error) => {
        return new Promise((resolve, reject) => reject(`[EXPECTED] ${error}`))
    }
}
