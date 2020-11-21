module.exports = {
    name: "challengeaccepted",
    description: "Take the Mr. Ping Challenge!",
    category: "memes",
    template: 'sendbuffer',
    data: {
        image: () => global.assets.challengeaccepted,
        name: 'challengeaccepted.jpg'
    },
    aliases: ['ca','accepted']
}

global.modules.saveAsset("https://memegenerator.net/img/instances/52471956.jpg",'challengeaccepted.jpg');
