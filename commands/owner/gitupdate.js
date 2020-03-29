module.exports = {
    name: "gitupdate",
    description: "Updates the bot from GitHub!",
    usage: ``,
    category: `owner`,
    accessableby: "Bot Owner",        
    aliases: ["gitu"],
}

const { existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync, copyFileSync } = require('fs');
const { execSync } = require('child_process');

const deleteFolderRecursive = (path) => {
    if (!existsSync(path)) return; // if it doesnt exist, end
    readdirSync(path).forEach((file) => { // loop through each subfile
        const filepath = `${path}/${file}`;
        if (lstatSync(filepath).isDirectory()) {
            deleteFolderRecursive(filepath); // recusive call
        } else {
            unlinkSync(filepath); // delete file
        }
    })
    rmdirSync(path); // delete directory
}

const copyFolderRecursive = (path, destination) => {
    if (!existsSync(path)) return
    if (!existsSync(destination)) mkdirSync(destination) // create destination folder if none exists
    readdirSync(path).forEach(file => {
        const filepath = `${path}/${file}`
        if (lstatSync(filepath).isDirectory()) {
            copyFolderRecursive(filepath, `${destination}/${file}`) // copy files in the subfolder
        } else {
            copyFileSync(filepath, `${destination}/${file}`) // copy file
        }
    })
}

module.exports.run = async (bot, msg) => {
    try {
        // download new files
        deleteFolderRecursive('./SpeckyBot') // just incase it's leftover
        execSync(`git clone "https://github.com/SpeckyYT/SpeckyBot"`)
        deleteFolderRecursive('./') // delete old files
        copyFolderRecursive('./SpeckyBot', './') // copy new files
        deleteFolderRecursive('./SpeckyBot') // delete temp download
    } catch (e) {
        console.log("Bot not updated correctly".toUpperCase().fatal);
    }
}
