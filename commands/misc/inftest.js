module.exports.run = async (bot, msg) => {
    let { args } = msg;
    switch(args[0]){
        case "1":
            args = args.slice(1);
            if(!args[1]) return;
            let smallnum = (Math.min(args[0], args[1]));
            let bignum = (Math.max(args[0], args[1]));
            msg.channel.send(`The bigger number of both is: ${bignum}`); msg.channel.send(`The smaller number is: ${smallnum}`);
            var even; if((bignum % 2) === 0) {even = "even"} else {even = "odd"} msg.channel.send(`The biggest number is ${even}`)
            var divisible; if((bignum % smallnum) === 0){ divisible = "out"} else {divisible = ""} msg.channel.send(`The biggest number is divisible trough the smaller number with${divisible} remainders!`)
            break
        
        default:
            msg.channel.send("You have to define which test you want to see [1]")
    }
}

module.exports.config = {
    name: "inftest",
	description: "These were the C++ exams in SpeckyYT's class (Written in JavaScript)!\nTest #1: 06/11/2019",
    usage: `[exam number] <depends from exam>`,
    category: `misc`,
	accessableby: "Members",
    aliases: ["it"]
}


