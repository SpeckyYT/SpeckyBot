const osr = require('node-osr');
const utils = require('../utils/utils');

module.exports.parseReplay = function(replayPath) {
    let replay = osr.readSync(replayPath);

    // Since we're parsing the replay data, we'll put the raw data in a new property
    // and put the parsed data the initial variable.
    replay.raw_replay_data = replay.replay_data;
    replay.replay_data = [];

    const rawFrameData = replay.raw_replay_data.split(",");

    // Go through the raw replay data and begin to parse it.
    for (let i = 0; i < rawFrameData.length; i++) {
        const frameDataArray = rawFrameData[i].split("|");

        // Get the base frame data into an object
        const frameDataObject = {
            timeSinceLastAction: Number(frameDataArray[0]),
            x: Number(frameDataArray[1]),
            y: Number(frameDataArray[2]),
            keyPressedBitwise: Number(frameDataArray[3]),
            keysPressed: {
                K1: false,
                K2: false,
                M1: false,
                M2: false,
            }
        }

        // If the game mode is std, ctb, or taiko, we modify the keysPressed Object  
        if (replay.gameMode != 3) {
            let binaryKeys = utils.dec2bin(frameDataObject.keyPressedBitwise) + "";
            binaryKeys = binaryKeys.split("").reverse().join("");

            // Differentiate between key and mouse clicks.
            if (binaryKeys.length == 4) {
                if (binaryKeys[0] == 1 && binaryKeys[2] == 1)
                    frameDataObject.keysPressed.K1 = true;
                if (binaryKeys[1] == 1 && binaryKeys[3] == 1)
                    frameDataObject.keysPressed.K2 = true;  
            } else {
                if (binaryKeys[0] == 1)
                    frameDataObject.keysPressed.M1 = true;
                if (binaryKeys[1] == 1)
                    frameDataObject.keysPressed.M2 = true;                   
            }                             
        }

        // If the game mode is mania, change the keysPressed object to be more mania-friendly.
        if (replay.gameMode == 3) {
            // Create a new base object for the mania keys pressed
            frameDataObject.keysPressed = {
                Key1: false,
                Key2: false,
                Key3: false,
                Key4: false,
                Key5: false,
                Key6: false,
                Key7: false,
                Key8: false,
                Key9: false,
                Key10: false
            }   

            // The keys hit is completely based on the bitwise combination of the x in the frame data.
            if (frameDataObject.timeSinceLastAction > 0) {
                // Convert the decimal keys pressed to binary, and reverse it.
                // This will turn the binary similar to StepMania's beatmap parsing.
                // Example: 1010 = Only Keys 1 and 3 are pressed.
                let binaryKeys = utils.dec2bin(frameDataObject.x) + "";
                binaryKeys = binaryKeys.split("").reverse().join("");
                for (let j = 0; j < binaryKeys.length; j++) {
                    if (binaryKeys[j] == 1) {
                        frameDataObject.keysPressed["Key" + (j + 1)] = true;                 
                    }
                }
            }
        }

        // Push the new replay data object onto the array 
        replay.replay_data.push(frameDataObject);
    }

    return replay;   
}

