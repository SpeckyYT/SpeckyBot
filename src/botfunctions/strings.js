module.exports = (bot) => {
    bot.singPlur = (variable, string, outputNumb = true) => {
        return `${outputNumb?variable:''} ${string}${variable == 1 ? '' : 's'}`.trim()
    }
}
