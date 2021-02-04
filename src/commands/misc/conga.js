module.exports = {
    name: "conga",
    description: "Conga!",
    category: "misc",
    aliases: ['konga']
}

// Credit to: https://matias.ma/nsfw/

const { Canvas } = require('canvas');

const width = 400;
const height = 400;

module.exports.run = async (bot, msg) => {
    const canvas = new Canvas(width,height);
    const ctx = canvas.getContext('2d');
}
