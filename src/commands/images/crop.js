module.exports = {
    name: "crop",
    description: "Crops the image!",
    usage: "",
    category: `images`,
    aliases: ["autocrop"]
}

module.exports.run = async (bot, msg) => {
    return require('.\\functions\\methods')(bot,msg,null,false,false,"png");
}
