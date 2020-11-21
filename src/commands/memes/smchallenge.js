module.exports = {
    name: "smchallenge",
    description: "Take the Super Mario Challenge!",
    category: "memes",
    template: 'sendbuffer',
    data: {
        image: () => global.assets.smchallenge,
        name: 'smchallenge.jpg'
    },
    aliases: ['supermario','mariochallenge']
}

global.modules.saveAsset("https://i.imgur.com/KJR4bIC.jpg",'smchallenge.jpg');
