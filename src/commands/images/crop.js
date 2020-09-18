module.exports = {
    name: "crop",
    description: "Crops the image!",
    category: "images",
    aliases: ["autocrop"]
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot,msg,"autocrop",false,false,"png");
}
