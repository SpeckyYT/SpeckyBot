const error = 'Image not loaded correctly';

module.exports.sendbuffer = ({image,data,buffer,file,name}) =>
    (bot,msg) => {
        const toCheck = image || data || buffer || file;
        const toSend = typeof toCheck == 'function' ? toCheck() : toCheck;
        if(!(toSend instanceof Buffer)) throw error;
        return msg.channel.send(toSend.toAttachment(name||'file'));
    }
