// For CoffeeScript Variations
const { join } = require('path');

const coffeePath = join(__dirname,'modules','coffee.js');

module.exports = () => {
    const generator = require(coffeePath);

    // index 0: npm module
    // index 1: extension (optional)
    [
        [
            'coffeescript',
            ['coffee','coffeescript']
        ],
        [
            'livescript',
            'ls'
        ],
        [
            'iced-coffee-script',
            'iced'
        ],
        [
            'koffee'
        ],
        [
            'blackcoffee'
        ],
        [
            'toffee-script',
            ['toffee','toffeescript']
        ],
        [
            'caffeine'
        ],
        [
            'coco'
        ]
    ]
    .forEach(data => generator(...data));
}
