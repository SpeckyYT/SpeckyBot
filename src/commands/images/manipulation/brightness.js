module.exports = {
    name: "brightness",
    description: "Changes the brightness of the image!",
    usage: `[Amount (-100 - 100)]`,
    category: "images",
    template: 'images',
    data: {
        method: 'brightness',
        percent: true,
        values: [20,-100,100]
    }
}
