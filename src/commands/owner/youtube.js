module.exports = {
    name: "youtubedl",
    description: "Downloads a video",
    usage: "<video link>",
    category: "owner",
    aliases: ['ydl']
}

const fs = require('fs');
const youtubedl = require('youtube-dl');
const { join } = require('path');

module.exports.run = (bot, msg) => {
    const video = youtubedl(msg.cmdContent,['--format=18'],{cwd:__dirname});
    video.on('info', info =>
        video.pipe(fs.createWriteStream(join(process.cwd(),"..",info._filename)))
    )
}
