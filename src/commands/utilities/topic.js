module.exports = {
    name: "topic",
    description: "Gives you a random question to trigger a discussion!",
    usage: ``,
    category: `utilities`,
    accessableby: "Members",
    aliases: ["bruh"]
}

const questions = [

    "Are you a giver or taker?",
    "As a child, what did you want to be when you grew up?",

    "Describe your perfect man/woman.",

    "Do you follow your heart or your head?",
    "Do you prefer to eat at home or eat out?",
    "Do you like dogs or cats?",
    "Do you have any siblings?",
    "Do you play any sports?",

    "If you could only eat one thing for the rest of your life, what would it be?",
    "If you were a waiter and had a rude customer, what would you do?",
    "If you could live anywhere on earth, where would you live?",
    "If you knew that you only had a year left to live, what would you do?",

    "Have you read anything good recently?",

    "How many pairs of shoes do you own?",
    "How would you define success?",
    "How would your friends describe you?",

    "What do you carry in your purse/wallet?",
    "What is one thing that you can not live without?",
    "What is the best thing about school/work?",
    "What is the longest that you've stayed awake for?",
    "What is the least favorite thing about this week?",
    "What is the worst movie that you've seen?",
    "What is your earliest memory?",
    "What is your favourite song?",
    "What was the biggest life change you've gone through?",
    "What would you do differently if you could relive the past year?",

    "Where did you go on your last vacation?",
    "Where is your favorite place to shop?",
    "Which is better, being the boss or an employee?",

    "Would you rather be blind or deaf?",
    "Would you rather be rich and ugly, or poor and good looking?",
    "Would you rather be tall and fat or short and well built?",
    "Would you rather be the best player on a horrible team or the worst player on a great team?",
    "Would you rather be the smartest moron or dumbest genius?",
    "Would you rather not be able to use your hands or not be able to walk?"
    
]

module.exports.run = async (bot, msg) => {
    const question = questions[Math.floor(Math.random()*questions.length)]

    if(msg.command == "topic"){
        msg.channel.send(question)
    }else{
        const embed = bot.embed()
        .setTitle(msg.author.username)
        .setDescription(`${msg.author} wants to start talking about this:\n\n**${question}**`)
        .setThumbnail(msg.author.avatarURL)
        .setColor(msg.member.displayHexColor)
        .setFooter("User joined")
        .setTimestamp(msg.member.joinedTimestamp);

        msg.channel.send(embed)
    }
}
