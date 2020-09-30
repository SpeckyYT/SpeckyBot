module.exports = {
    name: "speckysort",
    description: "Will sort an array with SpeckySort!",
    category: "misc"
}

const { exec } = require('child_process');
const { join } = require('path');

module.exports.run = async (bot,msg) => {
    const msgs = await msg.channel.send("Generating your epic SpeckySort GIF!\n(this usually takes some time...)")

    const path =         [
        'node',
        '"'+join(__dirname,'children','speckysort.js')+'"'
    ].join(' ');

    msg.channel.send(
        await new Promise((res,rej) =>
            exec(
                path,
                {},
                (err,stdout,stderr) => {
                    if(stderr||err){
                        console.table({
                            stderr, err
                        })
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
