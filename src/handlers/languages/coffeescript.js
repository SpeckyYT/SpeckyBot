module.exports = () => {
    require('coffee-register');
    require.extensions['.coffeescript'] = require.extensions['.coffee'];
}
