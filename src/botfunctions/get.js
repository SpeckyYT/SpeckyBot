module.exports = (bot) => {
    bot.getUser = (input, guild) => {
        let us;
        us = guild.members.find( item => {
            try{
                return item.user.username.toLowerCase() === input.toLowerCase()
            }catch(err){
                return null
            }});
        if( us != null && typeof us != undefined) {
            return us.user
        }
        us = guild.members.get(input);
        if(typeof us != null && typeof us != undefined){
            return us.user
        }
        return input;
    }

    bot.getMember = (input, guild) => {
        let mmb;
        mmb = guild.members.find( item => {
            try{
                return item.user.username.toLowerCase() === input.toLowerCase()
            }catch(err){
                return null
            }});
        if( mmb != null && typeof mmb != undefined) {
            return mmb
        }
        mmb = guild.members.get(input);
        if(typeof mmb != null && typeof mmb != undefined){
            return mmb
        }
        return input;
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
}
