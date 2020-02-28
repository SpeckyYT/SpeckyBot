module.exports = {
    name: "roman",
	description: "Can convert from and to roman numerals!",
    usage: `<number>`,
    category: `utilities`,
	accessableby: "Members",
    aliases: ["romannum","romannumber","romannumbers"]
}

module.exports.run = async (bot, msg) => {
    let romannum = msg.ARGS.join("");
    let regex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g;
    let matches = romannum.trim().match(regex);
    if(matches){
        let res = deromanize(romannum);
        if(matches[0].length && res){
            return msg.channel.send(res);
        }
    }
    if(!isNaN(romannum) && romannum){
        if(romannum > 3999){
            return bot.cmdError("Number can't be bigger than 3999");
        }
        return msg.channel.send(romanize(romannum));
    }
    return bot.cmdError("Number is invalid");
}

//FROM http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
function deromanize (str) {
	var	str = str.toUpperCase(),
		validator = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g,
		token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
		key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
		num = 0, m;
	if (!(str && validator.test(str)))
		return false;
	while (m = token.exec(str))
		num += key[m[0]];
	return num;
}

function romanize (num) {
	if (!+num)
		return false;
	var	digits = String(+num).split(""),
		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
		       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
		       "","I","II","III","IV","V","VI","VII","VIII","IX"],
		roman = "",
		i = 3;
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
}