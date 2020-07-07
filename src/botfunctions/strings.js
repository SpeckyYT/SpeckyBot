module.exports = (bot) => {
    bot.singPlur = (variable, string, outputNumb = true) => {
        return `${outputNumb?variable:''} ${string}${variable == 1 ? '' : 's'}`.trim()
    }
    
    bot.highFirst = string => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
    }
}
