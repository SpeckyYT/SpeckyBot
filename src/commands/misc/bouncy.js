module.exports = {
    name: "bouncy",
    description: "Gives yo a gif of a bouncing ball!",
    category: "utilities",
}

const { exec } = require('child_process');
const { join } = require('path');

module.exports.run = async (bot, msg) => {
    const msgs = await msg.channel.send("Generating your epic bouncing cube GIF!\n(this usually takes a lot of time...)")

    const path =         [
        'node',
        '"'+join(__dirname,'children','bouncy.js')+'"',
        '"'+bot.user.avatarURL({format:'png',size:32})+'"'
    ].join(' ');

    msg.channel.send(
        await new Promise((res,rej) =>
            exec(
                path,
                {},
                (err,stdout,stderr) => {
                    if(stderr||err){
                        res(bot.cmdError("Error happend"))
                    }
                    if(stdout){
                        res(Buffer.from(stdout,'base64').toAttachment("bouncy.gif"))
                    }
                }
            )
        )
    )
    .then(() => msgs.delete())
}
