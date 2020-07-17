module.exports =
    name: "o'clock"
    description: "Is it X o'clock?"
    usage: ""
    type: "template"
    category: "misc"
    aliases: []
    run: (bot,msg) ->
        return "#{if !new Date().getMinutes() then "Yes" else "No"}, it's#{if new Date().getMinutes() then " not" else ""} X o'clock"
