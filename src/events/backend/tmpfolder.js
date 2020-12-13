module.exports = {
    event: "* * * * *"
}

const { join } = require('path');

module.exports.call = (bot) => global.modules.deleteFolder(join(process.cwd(),'tmp'));
