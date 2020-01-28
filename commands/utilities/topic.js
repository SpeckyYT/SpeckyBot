module.exports = {
    name: "topic",
    description: "Gives you a random question to trigger a discussion!",
    usage: ``,
    category: `utilities`,
    accessableby: "Members",
    aliases: ["bruh"]
}

const { RichEmbed } = require('discord.js')

let questions = [
    "What is one thing that you can not live without?",
    "What is the longest that you've stayed awake for?",
    "What is the least favorite thing about this week?",
    "If you could only eat one thing for the rest of your life, what would it be?",
    "If you were a waiter and had a rude customer, what would you do?",
    "Would you rather be poor or ugly?",
    "Do you follow your heart or your head?",
    "Do you prefer to eat at home or eat out?",
    "What was the biggest life change you've gone through?",
    "Would you rather be tall and fat or short and well built?",
    "Do you like dogs or cats?",
    "What is your favourite song?",
    "How would you define success?",
    "If you could live anywhere on earth, where would you live?",
    "Do you have any siblings?",
    "What is the best thing about school/work?",
    "If you knew that you only had a year left to live, what would you do?",
    "As a child, what did you want to be when you grew up?"
]

module.exports.run = async (bot, msg) => {
    let question = questions[Math.floor(Math.random()*questions.length)]

    if(msg.command == "topic"){
        msg.channel.send(question)
    }else{
        msg.channel.send(
            new RichEmbed()
            .setTitle(msg.author.username)
            .setDescription(`${msg.author} wants to start talking about this:\n\n**${question}**`)
            .setThumbnail(msg.author.avatarURL)
            .setColor(msg.member.displayHexColor)
            .setFooter("User joined")
            .setTimestamp(msg.member.joinedTimestamp)
        )
    }
}
