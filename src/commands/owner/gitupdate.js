module.exports = {
    name: "gitupdate",
    description: "Updates the bot!",
    category: "owner"
}

const { join } = require('path');
const nodegit = require('nodegit');

module.exports.run = async (bot, msg) => {
    nodegit.Repository.open(join(process.cwd(),'..',".git"))
    .then(function(repo) {
        return repo.fetch("origin", {
            callbacks: {
                credentials: function(url, userName) {
                    return nodegit.Cred.sshKeyFromAgent(userName);
                }
            }
        });
    })
    .done(function() {
        msg.channel.send('Updated!');
    });
}
