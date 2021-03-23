emojis = [
    [
        'flushed'
        '😳'
    ]
    [
        'joy'
        '😂'
    ]
    [
        'pensive'
        '😔'
    ]
    [
        'poop'
        '💩'
    ]
    [
        'sob'
        '😭'
    ]
    [
        'sunglasses'
        '😎'
    ]
    [
        'thinking'
        '🤔'
    ]
]

module.exports = ({
    name: name
    template: 'emoji'
    data: { emoji }
    description: emoji
    category: "misc"
    aliases: [emoji,...aliases]
} for [name,emoji,...aliases] in emojis)
