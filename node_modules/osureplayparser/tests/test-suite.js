const fs = require('fs');
const osuReplayParser = require('../index');

const replayPath = ".osr";
const outputPath = ".json";
const replay = osuReplayParser.parseReplay(replayPath);

fs.writeFileSync(outputPath, JSON.stringify(replay, null, 2));