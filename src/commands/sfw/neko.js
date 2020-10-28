module.exports = {
    name: "neko",
    description: "Gives you a neko!",
    category: "sfw",
    aliases: ["nya","nyan"],
    flags: ["sfw"],
    template: 'sfw',
    data: {
        methods: ["neko","nekoGif"],
        methodsNSFW: ["neko","nekoGif","eroNeko"]
    }
}
