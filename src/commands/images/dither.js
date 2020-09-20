module.exports = {
    name: "dither",
    description: "Dithers the image!",
    category: "images"
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot, msg,'dither565',false,false,"png");
}
