module.exports = {
    name: "roman",
    description: "Can convert from and to roman numerals!",
    usage: `<number>`,
    category: `utilities`,
    aliases: ["romannum","romannumber","romannumbers"]
}

module.exports.run = async (bot, msg) => {
    const romannum = msg.ARGS.join("");
    const regex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g;
    const matches = romannum.trim().match(regex);
    if(matches){
        const res = deromanize(romannum);
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

// FROM http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
function deromanize (str) {
    str = str.toUpperCase();
    const validator = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/g;
    const token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    const key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}
    let num = 0;
    let m = 1;
    
    if (!(str && validator.test(str))) return false;
    
    while (m){
        m = token.exec(str);
        num += key[m[0]];
    }
    return num;
}

function romanize (num) {
    if (!+num)
        return false;
    const digits = String(+num).split("");
    const key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
        "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
        "","I","II","III","IV","V","VI","VII","VIII","IX"];
    let roman = "";
    let i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
