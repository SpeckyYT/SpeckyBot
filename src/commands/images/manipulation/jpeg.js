const def = 20;
const min = 1;
const max = 100;

module.exports = {
    name: "jpeg",
    description: "Applies a jpeg filter to the image!",
    usage: `[Amount (${min}-${max})]`,
    category: "images",
    template: 'images',
    data: {
        method: 'quality',
        values: [def,min,max]
    },
    aliases: ["jpg"]
}
