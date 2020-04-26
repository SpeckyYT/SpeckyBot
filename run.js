const { spawn } = require('child_process');

const CP = spawn(`${__dirname}/src/bot.bat`,{stdio: [process.stdin, process.stdout, process.stderr]});

CP.on('exit', code => {
    console.log(`Bot died with code ${code}`);
    process.exit(code);
});
