const def = 5;
const min = 2;
const max = 100;

module.exports = {
    name: "blur",
    description: "Blurs the image!",
    usage: `[Amount (${min}-${max})]`,
    category: "images",
    template: 'images',
    data: {
        method: 'blur',
        values: [def,min,max]
    }
}
