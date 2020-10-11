module.exports = {
    event: ['ready','interval_10_min']
}

const fs = require('fs');
const { join } = require('path');

module.exports.call = (bot) => {
    const readmepath = join(process.cwd(),'..','README.md');
    fs.readFile(readmepath,{encoding:'utf-8'},(err,data) => {
        fs.readFile(join(process.cwd(),'commands','important','data','donations.json'),{encoding:'utf-8'},(e,d)=> {
            if(err || e) throw e || err;
            const parsed = JSON.parse(d);
            const arr = Object.keys(parsed).map((k,i) => [k,Object.values(parsed)[i]]).sort((a,b)=>b[1][0]-a[1][0]);
            const dnt = arr.map(([n,v],i) => `| ${n} | ${Number(v[0]).toFixed(2)}${v[1] || '€'} |`).join('\r\n');
            const string = `\r\n| Donator | Donation |\r\n|-|-|\r\n${dnt}\r\n`;
            const regex = /(?<=<!---donators--->)(\r|\n|.)*(?=<!---donators--->)/;
            if(string == data.match(regex)[0]) return;
            fs.writeFile(readmepath,data.replace(/(?<=<!---donators--->)(\r|\n|.)*(?=<!---donators--->)/,string),{encoding:'utf-8'},()=>{})
        })
    })
}
