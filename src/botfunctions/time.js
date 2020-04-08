module.exports = (bot) => {
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

    bot.msToTime = (ms) => {
        let {mil,sec,min,hrs,day} = bot.msToVars(ms);
        return `${day.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(1, "0")}s ${mil.padStart(3, "0")}ms`
    }

    bot.msToVars = (ms = 0, keep = false) => {
        ms = Math.abs(ms);
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
}
