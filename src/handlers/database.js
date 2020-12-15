const db = require('quick.db');

module.exports = () => {

    const BU = db.get('bannedUsers');
    if(!Array.isArray(BU)) db.set('bannedUsers',[]);

}
