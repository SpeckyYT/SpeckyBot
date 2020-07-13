module.exports = {
    name: "tascomp",
    description: "TasComp stuff",
    usage: `<stuff>`,
    category: `owner`,
    aliases: []
}

const { Collection } = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot,msg) => {
    const tasComp = new Collection();
    
    fs.readdirSync(__dirname+'/tascomp','utf-8')
    .forEach(c => {
        if(c.toLowerCase().includes('task')){
            fs.readFileSync(__dirname+'/tascomp/'+c)
            .toString()
            .replace(/(\d+)(st|nd|rd|th)./g,'$1')
            .replace(/ ?(\d+)"(\d+)\r?/g,'')
            .split('\n')
            .map(t=>t.split(' '))
            .map(a=>a.reverse())
            .forEach(v => tasComp.set(v[0],tasComp.has(v[0]) ? [...tasComp.get(v[0]),v[1]] : [v[1]]))
        }
    })

    console.log(tasComp)
}
