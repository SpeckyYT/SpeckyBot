module.exports.emotes = {
    Eonline: "<:online:661611929332219905>",
    Eidle: "<:idle:661611969131970580>",
    Ednd: "<:dnd:661612025943818265>",
    Eoffline: "<:offline:661612200527396865>"
}

module.exports.listCreator = (memberTypeCollection,list) => {
    memberTypeCollection.forEach(async memberType => {
        if(list[memberType.user.presence.status]){
            list[memberType.user.presence.status].push([memberType.user.username]);
        }else{
            list[memberType.user.presence.status] = [memberType.user.username];
        }
    })
    return list;
}

module.exports.statusCheckQuantity = (list,status) => {
    if(!list[status]){
        return "[0] *Nobody*";
    }else if(list[status].join(', ').length > 1965){
        return `[${list[status].length}] *Too many people...*`;
    }else{
        return `[${list[status].length}] ${list[status].join(', ')}`;
    }
}

module.exports.membersEmbed = (title,msg,[[online,Eonline],[idle,Eidle],[dnd,Ednd],[offline,Eoffline]]) => {
    let { RichEmbed } = require('discord.js');
    let maxmsglength = 1965;
    online = `${Eonline} ${online}`;
    idle = `${Eidle} ${idle}`;
    dnd = `${Ednd} ${dnd}`;
    offline = `${Eoffline} ${offline}`;

    let embed = new RichEmbed()
    .setTitle(`__${title}__:`)
    .setThumbnail(msg.guild.iconURL);

    let statusArray = [online,idle,dnd,offline];

    let currentMessage = '';

    for (const message of statusArray) {

        if (currentMessage.length + message.length > maxmsglength) {
            msg.channel.send(embed.setDescription(currentMessage));
            currentMessage = '';
        }

        currentMessage = `${currentMessage}\n${message}`;
    }

    if (currentMessage.length < maxmsglength) {

        msg.channel.send(embed.setDescription(currentMessage));

    }
}

//RANDOM QUESTIONS by Nick Guimond

module.exports.getQuestion = () => {
    let nouns = ['cat', 'keyboard', 'mouse', 'onion', 'turtle', 'cell phone', 'backgammon game', 'cassette tape', 'movie', 'pencil', 'shirt', 'brush','tv','car','van','goat','zebra','dog','elephant','seagull','bat','crab','snail','racoon','bear','teddy bear','jeans','t-shirt','jeans','dress','skirt','flower','guitar','sunhat','fedora','baseball hat','sunglasses','ripped jeans','acoustic guitar','watermellon','dress shirt','winter jacket','cheeseburger','cow','pig','picture frame','wall art','paint brush','can of paint','water'];
    let adjs = ['smelly', 'sticky', 'random', 'gross', 'putrid', 'green', 'hard', 'soft', 'bouncy', 'lightweight', 'beautiful', 'nice'];
    let exclamations = ['wicked', 'awesome', 'totally rad', 'so coooool', 'terrific', 'crazy awesome', 'neato burrito', 'sorta neat', 'just ok', 'not that great', 'pretty awfull'];

    let questions = [
        `I have a question about my ${combo()}`,
        `Can you help me find my ${noun()}?`,
        `What color ${noun()} should i get?`,
        `Who sells the best ${adj()} tacos?`,
        `Where can i get a ${exc()} haircut?`,
        `What do you suppose this ${noun()} is made of?`,
        `Which ${noun()} is the fastest?`,
        `Why is my ${noun()} so ${adj()}?`,
        `What is the best ${combo()} brand?`,
        `What ${exc()} ${combo()} should i get?`,
        `How do i make the best ${combo()}?`,
        `What ${noun()} should i get?`,
        `Do you sell ${exc()} ${noun()}s?`,
        `Where can i buy a new ${noun()}?`,
        `How many ${exc()} TV channels are there relating to ${noun()}?`,
        `Do i think too much about ${noun()}s?`,
        `How can i go about getting a refund for this ${combo()}?`,
        `Oh ${exc()} .. . I feel like i got overcharged for this ${combo()}?`,
        `What paperwork will be required to officialy adopt this ${noun()}?`,
        `When can I expect delivery of my new ${noun()}?`,
        `Where can I find a ${exc()} present for my mom?` 
    ];

    function combo() {
        let randomNounIndex = Math.floor((Math.random() * nouns.length));
        let randomAdjsIndex = Math.floor((Math.random() * adjs.length));
        return adjs[randomAdjsIndex] + ' ' + nouns[randomNounIndex];
    }
    function adj() {
        let randomAdjsIndex = Math.floor((Math.random() * adjs.length));
        return adjs[randomAdjsIndex];
    }
    function noun() {
        let randomNounIndex = Math.floor((Math.random() * nouns.length));
        return nouns[randomNounIndex];
    }
    function exc() {
        let randomExIndex = Math.floor((Math.random() * exclamations.length));
        return exclamations[randomExIndex];
    }

    let randomNum = Math.floor((Math.random() * questions.length));
    return questions[randomNum];
}

module.exports.getPersonName = () => {
    let firstNames = ['Gerty', 'Betty', 'Bobby', 'Nick', 'Jon', 'Scott', 'Alice', 'Ricky', 'Bobberto', 'Audri' , 'Sally' , 'Amber' , 'Jedd' , 'Joey', 'Billy', 'Willaim', 'Joe','Sarah','Judy','Kendra', 'Mary-Ann','Richard','John','Fred','Daniel', 'Thomas','Jacob','Noah','Luis','Samuel','Justin','David','Logan','Ben','Juan','Pedro','James','Santiago','Martin','Jack','Emma','Brianna','Emilia','Sara','Sue','Zoe','Lea','Alysha','Sofia','Mia','Victoria','Raquel','Isabella','Olivia','Paula','Charlotte','Mary','Nicole','Grace','Madison'];
    let lastNames = ['Winterbottom', 'Gertzenhiemen', 'Smith', 'Goldsworthy', 'Bobby', 'Rosebottom', 'Smith', 'McSnikkers','McPickles','Ryder','Flynn','Williams','Johnson','Jones','Brown','Davis','Taylor','Anderson','Martin','Thompson','Wilson','Miller','Allen','Young','Wright','Adams','Baker','King','Scott','Evans','Cook','Murphy','Gray','Ross','Coleman','Gonzales','Woods','Fisher','Cruz','Hicks'];
    

    let randomFirstIndex = Math.floor((Math.random() * firstNames.length));
    let randomLastIndex = Math.floor((Math.random() * lastNames.length));
    return firstNames[randomFirstIndex] + ' ' + lastNames[randomLastIndex];
}
