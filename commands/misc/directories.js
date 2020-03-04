module.exports = {
    name: "directories",
	description: "Gives you a visualization of the entire SpeckyBot folder!",
    usage: ``,
    category: `misc`,
	accessableby: "Members",
    aliases: []
}

let dirtree = require("directory-tree")

module.exports.run = async (bot, msg) => {
    let directories = {}

    let cwd = process.cwd();

    dirtree(cwd, {exclude: [/node_modules|.git|.github|.vscode/g]}, null, async (item) => {
        let array = item.path.slice(cwd.length + 1).split("\\");
        console.log(array)

        if(array[0]){
            directories[array[0]] =
            directories[array[0]] || {}
        }
        if(array[1]){
            directories[array[0]][array[1]] =
            directories[array[0]][array[1]] || {}
        }
        if(array[2]){
            directories[array[0]][array[1]][array[2]] =
            directories[array[0]][array[1]][array[2]] || {}
        }
        if(array[3]){
            directories[array[0]][array[1]][array[2]][array[3]] =
            directories[array[0]][array[1]][array[2]][array[3]] || {}
        }
        if(array[4]){
            directories[array[0]][array[1]][array[2]][array[3]][array[4]] =
            directories[array[0]][array[1]][array[2]][array[3]][array[4]] || {}
        }
        if(array[5]){
            directories[array[0]][array[1]][array[2]][array[3]][array[4]][array[5]] =
            directories[array[0]][array[1]][array[2]][array[3]][array[4]][array[5]] || {}
        }
    })
    console.log(directories)
}
