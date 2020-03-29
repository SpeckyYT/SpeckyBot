const { existsSync, mkdirSync } = require('fs')

module.exports = async () => {
    ['events','commands']
    .forEach(dir => {
        if (!existsSync(`./${dir}/private`)) mkdirSync(`./${dir}/private`);
    });
    ['db']
    .forEach(dir => {
        if (!existsSync(`../${dir}`)) mkdirSync(`./${dir}`);
    });
}
