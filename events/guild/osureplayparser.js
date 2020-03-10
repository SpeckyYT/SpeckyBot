module.exports = {
    event: "message"
}

const fetch = require('node-fetch');
const { createWriteStream, unlink }= require('fs')

module.exports.call = async (bot, msg) => {
    if(!msg.attachments.size) return;
    msg.attachments.forEach(async attachment => {
        if(!attachment.filename.endsWith(".osr")) return;
        
        fetch(attachment.proxyURL).then(async file => {
            const dest = createWriteStream(attachment.filename,{encoding: "binary"});
            console.log(file.body)
            file.body.pipe(dest);


            //OsuReplayParser stuff

            unlink(attachment.filename,()=>{})
        })
    })
}