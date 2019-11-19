module.exports = async () => {
    console.log()
    console.log("Error occurred (REBOOTING)")
    console.log()
    process.exit();    
}

module.exports.config = {
    event: "error"
}