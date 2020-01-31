module.exports = async (bot) => {
    require('./dependencies')();
    require('./missingdirectories')();
    require('./missingfiles')();
    require('./botloader')(bot);
    require('./login')(bot);
    require('./website')(bot);
}
