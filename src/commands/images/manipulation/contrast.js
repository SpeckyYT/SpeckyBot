module.exports = {
    name: "contrast",
    description: "Applies a contrast to the image!",
    usage: `[Amount (-100 - 100)]`,
    category: "images",
    template: 'images',
    data: {
        method: 'contrast',
        percent: true,
        values: [20,-100,100]
    },
    aliases: ["real"]
}
