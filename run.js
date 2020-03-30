const { spawn } = require('child_process');
const prc = spawn(`${__dirname}\\src\\bot.bat`,{stdio: [0,'pipe']});

prc.stdout.on('data', (data) => {
    if(String(data)){
        console.log(String(data).replace(/^\n|\n$/g,''));
    }
});
  
prc.stderr.on('data', (data) => {
    if(String(data)){
        console.error(String(data));
    }
});

prc.on('exit', (code) => {
    console.log(`Bot died with code ${code}`);
    process.exit(code);
});