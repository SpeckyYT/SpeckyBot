const def = 100;
const min = 2;
const max = 500;

module.exports = {
    name: "posterize",
    description: "Posterizes the image!",
    usage: `[Amount (${min}-${max})]`,
    category: "images",
    template: 'images',
    data: {
        method: 'posterize',
        values: [def,min,max]
    }
}
