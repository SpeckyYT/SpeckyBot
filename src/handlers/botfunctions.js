const isImageUrl = require('is-image-url');
const { appendFile, readFile, writeFile } = require('fs');

module.exports = async (bot) => {
    bot.require = (module) => {
        try{
            delete require.cache[require.resolve(module)];
        }catch(e){}
        return require(module);
    }

    bot.msToVars = (ms = 0, keep = false) => {
        if(ms < 0){
            ms = (-ms)
        }
        let mil   = Math.floor(ms);
        let sec   = Math.floor(ms /  1000);
        let min   = Math.floor(ms / (1000 * 60));
        let hrs   = Math.floor(ms / (1000 * 60  * 60));
        let day   = Math.floor(ms / (1000 * 60  * 60  * 24));
        let month = Math.floor(ms / (1000 * 60  * 60  * 24 * 30));
        let year  = Math.floor(ms / (1000 * 60  * 60  * 24 * 30 * 12));

        if(!keep){
            mil = mil % 1000;
            sec = sec % 60;
            min = min % 60;
            hrs = hrs % 24;
            day = day % 30;
            month = month % 12;
        }

        return {mil,sec,min,hrs,day,month,year}
    }


    bot.msToTime = (ms) => {
        let {mil,sec,min,hrs,day} = bot.msToVars(ms);
        return `${day.padStart(1, "0")}d ${hrs.padStart(2, "0")}h ${min.padStart(2, "0")}m ${sec.padStart(1, "0")}s ${mil.padStart(3, "0")}ms`
    }


    bot.formatTime = (ms) => {
        let {sec,min,hrs,day} = bot.msToVars(ms);

        if(day > 0){
            return `${day} Day${(day == 1) ? '' : 's'}`
        }else if(hrs > 0){
            return `${hrs} Hour${(hrs == 1) ? '' : 's'}`
        }else if(min > 0){
            return `${min} Minute${(min == 1) ? '' : 's'}`
        }else{
            return `${sec} Second${(sec == 1) ? '' : 's'}`
        }
    }


    bot.getChannel = (input, guild) => {
        let ch;
        ch = guild.channels.find( item => {
            try{
                return item.name.toLowerCase() === input.toLowerCase()
            }catch(err){
                return null
            }});
        if( ch != null && typeof ch != undefined) {
            return ch
        }
        ch = guild.channels.get(input);
        if(typeof ch != null && typeof ch != undefined){
            return ch
        }
        return input;
    }


    bot.getUser = (input, guild) => {
        let us;
        us = guild.members.find( item => {
            try{
                return item.user.username.toLowerCase() === input.toLowerCase()
            }catch(err){
                return null
            }});
        if( us != null && typeof us != undefined) {
            return us.user
        }
        us = guild.members.get(input);
        if(typeof us != null && typeof us != undefined){
            return us.user
        }
        return input;
    }


    bot.getMember = (input, guild) => {
        let mmb;
        mmb = guild.members.find( item => {
            try{
                return item.user.username.toLowerCase() === input.toLowerCase()
            }catch(err){
                return null
            }});
        if( mmb != null && typeof mmb != undefined) {
            return mmb
        }
        mmb = guild.members.get(input);
        if(typeof mmb != null && typeof mmb != undefined){
            return mmb
        }
        return input;
    }


    bot.highFirst = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    bot.debug = () => {
        console.log(bot.debugN++)
    }


    bot.resetDebug = () => {
        bot.debugN = 0;
    }


    bot.setLastImageCache = async (msg) => {
        let linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g

        function setImage(input){
            bot.cache.lastImage[msg.channel.id] = input;
        }

        await msg.channel.fetchMessages({limit: 50})
        .then(msgs => {
            msgs.array().reverse().some(message => {
                let matches = message.content.match(linkRegex);

                if(message.attachments.first()){
                    setImage(message.attachments.first().proxyURL);
                    return;
                }else
                if(matches){
                    let matchR
                    if(
                        matches.some(match => {
                            matchR = match;
                            if(isImageUrl(match)) return true;
                        })
                    ){
                        setImage(matchR);
                        return;
                    }
                }else
                if(message.embeds.length > 0){
                    try{
                        setImage(message.embeds[0].image.proxyURL);
                        return;
                    }catch(e){}
                    try{
                        setImage(message.embeds[0].thumbnail.proxyURL);
                        return;
                    }catch(e){}
                }
            })
        })
    }


    bot.checkOwner = (id) => {
        return bot.config.owner.includes(id)
    }


    bot.sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    bot.delay = bot.sleep;
    bot.wait = bot.sleep;
    bot.pause = bot.sleep;


    bot.singPlur = (variable, string, outputNumb = true) => {
        return `${outputNumb?variable:''} ${string}${variable == 1 ? '' : 's'}`.trim()
    }


    bot.cmdError = (error) => {
        return new Promise((resolve, reject) => reject(`[EXPECTED] ${error}`))
    }


    bot.findSnowflake = (snowflake) => {
        let user = bot.users.get(snowflake);
        let guild = bot.guilds.get(snowflake);
        let emoji = bot.emojis.get(snowflake);
        let channel = bot.channels.get(snowflake);

        let res = null;
        
        [user,guild,emoji,channel].reverse().some(item => {
            if(item){
                res = item;
            }
        })

        return res;
    }

    bot.logged = []

    bot.log = async (content) => {
        appendFile('../commands.log',`${content ? 
            content
            .replace(/[][[][0-9]{2}m/g,'')
            .replace(/\t/g,' ').replace(/ +/g,' ')
            : ''}\n`,
        ()=>{});

        let file;

        readFile('../commands.log', async (err,data)=>{

            file = data.toString().split('\n');

            if(file.length > 100000){
                while(file.length > 99000){
                    file.shift();
                }
                writeFile('../commands.log',file.join("\n"),()=>{})
            }

        })

        if(content){
            console.log(content)
        }else{
            console.log()
        }
    }

    const kaomoji = [
        '｡◕‿‿◕｡',
        '◔ ⌣ ◔',
        '(✿´‿`)',
        '(◕ᴗ◕✿)',
        '( °ω° )',
        '( o͡ ꒳ o͡ )',
        '( ͡o ω ͡o )',
        '(￣ω￣)',
        '\\(★ω★)/',
        '( =ω=)',
        '(^◕ᴥ◕^)',
        '(^◔ᴥ◔^)',
        'owo',
        'ÒwÓ',
        'OwO',
        'uwu',
        'UwU',
        '=w='
    ];

    bot.owofy = (string) => {
        if(typeof string == "string"){
            return  string.replace(/l|r/g,'w')
                .replace(/./g,',')
                .replace(/L|R/g,'W')
                .replace(/([Nn])([aeiouAEIOU])/g,'$1y$2')
                .replace(/lly/g,'')
                .replace(/([aeiouAEIOU])u/g,'$1w')
                .replace(/ad/g,'awd')
                .replace(/ove/g,'uv')
                .replace(/iend/g,'en')
                .replace(/!+/g,` ${kaomoji.pick()}`);
        }else{
            return null;
        }
    }

    bot.parseBet = (economy,author,bet,min) => {
        let { money } = economy[author.id];

        if(!min){
            min = 100
        }

        let nbet = Number(bet);

        if(nbet > money){
            return 0;
        }else if(nbet < (min ? min : 100)){
            return "0";
        }else if(bet === "all"){
            return money;
        }else if(isNaN(nbet)){
            return false;
        }else{
            return nbet;
        }
    }

    bot.economyRead = async (bot,author) => {
        return await new Promise((resolve,reject) => {
            readFile("db/userdata.json", "utf8", async (err,data) => {
                if(err){
                    reject(err);
                }else{
                    bot.economy = JSON.parse(data);
                    author = author.author || author;
                    author = author.id || author;
                    if(author){
                        await bot.economySummon(bot, author);
                        resolve();
                    }
                }
            })
        })
    }

    bot.economySummon = async (bot, user) => {
        if(!bot) return;
        if(!bot.economy) return;

        if(user){
            user = user.user || user;
            user = user.id || user;

            let changes = false;

            if (!bot.economy[user]) {
                bot.economy[user] = {};
                changes = true;
            }
            if (!bot.economy[user].lastDaily) {
                bot.economy[user].lastDaily = "";
                changes = true;
            }
            if (bot.economy[user].money === null) {
                bot.economy[user].money = 0;
                changes = true;
            }
            if (!bot.economy[user].money && bot.economy[user].money != 0) {
                bot.economy[user].money = 1000;
                changes = true;
            }
            if(changes){
                await bot.economyWrite(bot.economy);
            }
        }
    }

    bot.economyWrite = async (economy) => {
        return await new Promise((resolve, reject) => {
            economy = economy.economy || economy;
            writeFile("db/userdata.json", JSON.stringify(economy,null,4), (err) => {
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            })
        })
    }

    bot.loadSettings = async (bot) => {
        ['user','server'].forEach(f => {
            delete require.cache[require.resolve(`../../db/${f.charAt(0)}_settings.json`)];
            try{
                bot.settings[f] = require(`../../db/${f.charAt(0)}_settings.json`);
            }catch(err){
                console.log(`Your db/${f.charAt(0)}_settings.json file looks like to be corrupted.\nPlease fix it before it becomes an issue.`.error)
            }
        })
    }

    bot.loadConfig = (bot) => {
        delete require.cache[require.resolve('../../config.json')];
        try{
            bot.config = require('../../config.json');
        }catch(err){
            console.log("YOUR CONFIG.JSON FILE LOOKS LIKE TO BE CORRUPTED!\nPLEASE FIX IT BEFORE IT BECOMES AN ISSUE.".fatal)
        }
    }

    bot.bf = (insts, options) => {
        options = options || {};

        const MEM_LENGTH = options.length || 2**32-1;
        const MEM_SIZE = options.size || 2**8;
        const TIME_LIMIT = options.time || 1000; // ms
        
        let instructions = [];
        let loops = [];
        let skip = 0;
        let pos = 0;
        let output = {
            string: [],
            numbers: []
        };
        let cell = 0;
        let memory = [];

        if(typeof insts == "string"){
            instructions = insts.split('');
        }else if(Array.isArray(insts)){
            insts.forEach(v => {
                if(typeof v == "string"){
                    v.split('').forEach(w => {
                        instructions.push(w);
                    });
                }
            })
        }else{
            return {error: true};
        }

        const start = new Date().getTime();

        let tOut = false;

        while (pos < instructions.length){
            if (new Date().getTime() > (start+TIME_LIMIT)){
                tOut = true;
                break;
            }

            if(typeof memory[cell] != "number"){
                memory.push(0);
            }

            let c = instructions[pos];

            //1 Second Benchmark: +[>+]
            //830912  "c.includes(instruction)"
            //1177415 "c == instruction"
            //1250412 "c == instruction" + continue

            if (c == '['){
                if(memory[cell]){
                    loops.push(pos);
                }else{
                    skip++
                }
                pos++;
                continue;
            }

            if (c == ']'){
                if(memory[cell]){
                    pos = loops[loops.length-1];
                }else{
                    if(skip > 0){
                        skip--;
                    }else{
                        loops.pop();
                    }
                }
                pos++;
                continue;
            }

            pos++;
            if(skip > 0) continue;

            if (c == '+'){
                if(memory[cell]+1 >= MEM_SIZE){
                    memory[cell] = 0;
                }else{
                    memory[cell]++;
                }
                continue;
            }

            if (c == '-'){
                if(memory[cell]-1 < 0){
                    memory[cell] = MEM_SIZE-1;
                }else{
                    memory[cell]--;
                }
                continue;
            }

            if (c == '>'){
                if(cell+1 > MEM_LENGTH){
                    cell = MEM_LENGTH;
                }else{
                    cell++;
                }
                continue;
            }

            if (c == '<'){
                if(cell-1 < 0){
                    cell = 0;
                }else{
                    cell--;
                }
                continue;
            }

            if (c == '.'){
                output.string.push(String.fromCharCode(memory[cell]));
                output.numbers.push(memory[cell]);
                continue;
            }
        }

        while(memory.last() === 0 && memory.length > 1){
            memory.pop();
        }

        while(options.limit && memory.length > 250){
            memory.pop();
        }

        output.string = output.string.join('');

        let { string } = output;
        let { numbers } = output;

        const end = new Date().getTime();

        const time = end - start;

        return {tOut,output,string,numbers,memory,cell,time}
    }
}
