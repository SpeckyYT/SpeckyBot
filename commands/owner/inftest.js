module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!args[1]) return;
    let smallnum = (Math.min(args[0], args[1]));
    let bignum = (Math.max(args[0], args[1]));
    msg.channel.send(`The bigger number of both is: ${bignum}`); msg.channel.send(`The smaller number is: ${smallnum}`);
    var even; if((bignum % 2) === 0) {even = "even"} else {even = "odd"} msg.channel.send(`The biggest number is ${even}`)
    var divisible; if((bignum % smallnum) === 0){ divisible = "out"} else {divisible = ""} msg.channel.send(`The biggest number is divisible trough the smaller number with${divisible} remainders!`)
}

module.exports.config = {
    name: "inftest1",
	description: "This was the C++ exam #1 in SpeckyYT's class (06/11/2019) (Written in JavaScript)!",
    usage: `<num1> <num2>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["it1"]
}


