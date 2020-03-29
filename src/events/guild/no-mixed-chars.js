module.exports = {
    event: "message"
}

module.exports.call = async (bot, msg) => {
    if(!msg.channel.topic) return;

    let text = '[no-mixed-chars]'

    let notAlphaNumRegEx = /[^A-Za-z0-9\s]+/g
    let LettersRegEx = /[A-Za-z\s]+/g
    let numbersRegEx = /[0-9]+/g

    if(msg.channel.topic.toLowerCase().includes(text.toLowerCase())){
        let matches1= msg.content.match(notAlphaNumRegEx);
        let matches2= msg.content.match(LettersRegEx);
        let matches3= msg.content.match(numbersRegEx);

        let result = Number(Boolean(matches1))+Number(Boolean(matches2))+Number(Boolean(matches3))

        if(result > 1){
            msg.delete().catch();
        }
    }
}
