const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if(isMainThread){
    module.exports.images = ({method, free, values, percent, fileFormat}) =>
        async function(bot, msg){
            const m = await msg.channel.send("Image is getting processed...");

            const worker = new Worker(
                __filename,
                {
                    workerData: {
                        image: bot.cache.lastImage[msg.channel.id],
                        intensity: msg.Args[0],
                        method,
                        free,
                        values,
                        percent,
                        fileFormat,
                    },
                },
            );

            return new Promise((res,rej) => {
                worker.once('message', async (image) => {
                    await m.delete().catch(()=>{});

                    worker.terminate();

                    if(image instanceof Uint8Array)
                        res(msg.channel.send(Buffer.from(image).toAttachment('image.png')));
                    if(typeof image == 'string')
                        res(bot.cmdError(image));
                    rej('Not sure what error happened');
                })
            })
        }
}else{
    const { read, MIME_PNG } = require('jimp');

    let { image, intensity, method, free, values, percent, fileFormat } = workerData;

    const [def,min,max] = Array.isArray(values) ? values : [];

    intensity = intensity ? parseInt(intensity) : def;
    if(isNaN(intensity)) intensity = def;
    if(typeof intensity == "number") intensity = intensity.clamp(min,max);
    if(percent) intensity = intensity / 100;

    if(isNaN(intensity) && (free || typeof min == "number" || typeof max == "number")){
        return parentPort.postMessage(`${intensity} is not a number`);
    }

    if(image == undefined) return parentPort.postMessage("No image found");

    if(!fileFormat) fileFormat = "png";

    return read(image, async (err, file) => {
        if(err) return parentPort.postMessage("Error happend");

        async function run(){
            file.getBufferAsync(MIME_PNG)
            .then(a => parentPort.postMessage(a));
        }

        if(method){
            if(typeof intensity == "boolean" && typeof min == "boolean" && typeof max == "undefined"){
                file[method](intensity,min); // for flip and flop
            }else if(!isNaN(intensity)){
                file[method](intensity);
            }else{
                file[method]();
            }
        }
        return run();
    })
}
