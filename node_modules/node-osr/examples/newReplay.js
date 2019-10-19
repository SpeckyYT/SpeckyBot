const osr = require('node-osr')
const fs = require('fs')

let replay = new osr.Replay()
// Hatsune Miku - Rubik's Cube (rui) [5x5x5].osu
replay.beatmapMD5 = '7fd023e5516b6339a264f319b3c59678'
replay.playerName = 'node-osr'
replay.number_300s = 300
replay.number_100s = 100
replay.number_50s = 50

replay.score = 1234567890
replay.max_combo = 727

// Simple motion, just to show that it works
replay.replay_data = '0|0|0|0,1500|512|384|0'

replay.writeSync('newReplay.osr')
console.log(' Finished ')