module.exports = (bot) => {
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
}