const error = 'Image not loaded correctly';

module.exports.sendbuffer = ({image,name}) =>
    (bot,msg) => {
        if(!image) throw error;
        const img = typeof image == 'function' ? image() : image;
        if(!(img instanceof Buffer)) throw error;
        return msg.channel.send(img.toAttachment(name));
    }
