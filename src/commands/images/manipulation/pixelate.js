const def = 5;
const min = 2;
const max = 100;

module.exports = {
    name: "pixelate",
    description: "Pixelates the image!",
    usage: `[Amount (${min}-${max})]`,
    category: "images",
    template: 'images',
    data: {
        method: 'pixelate',
        values: [def,min,max]
    },
    aliases: ["pixel"]
}
