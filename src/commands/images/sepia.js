module.exports = {
    name: "sepia",
    description: "Applies a sepia filter to the image!",
    category: "images"
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'sepia',false,false,"png");
}
