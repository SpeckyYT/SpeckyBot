module.exports = {
    name: "mrping",
    description: "Take the Mr. Ping Challenge!",
    category: "memes",
    template: 'sendbuffer',
    data: {
        image: () => global.assets.mrping,
        name: 'mrping.jpg'
    }
}

global.modules.saveAsset("https://i.imgflip.com/2e7d2i.jpg",'mrping.jpg');
