module.exports = {
    name: "rotate",
    description: "Rotates the image!",
    usage: `[Amount (0-360)]`,
    category: "images",
    template: 'images',
    data: {
        method: 'rotate',
        free: true,
        values: [0]
    }
}
