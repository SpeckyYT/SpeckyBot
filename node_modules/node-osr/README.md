# node-osr
NodeJS library for reading and writing osu replay files

---

### Features

* Load .osr replays
* Create new Replays
* Write them in .osr
* Synchronous and asynchronous 
* Promise asynchronous functions

### Install

Download it from npm.

`$ npm install node-osr --save`

## Documentation
Check out the [examples](./examples)

Require node-osr
`let osr = require('node-osr')`

#### osr.read([string | Buffer])
Promise version of osr.read().

#### osr.read([string | Buffer], (err, replay))
Asynchronious version of osr.readSync().

#### osr.readSync([string | Buffer])
Returns a Replay class with the input's data. 

#### new osr.Replay()
Creates a new blank Replay class.
```
Replay {
  gameMode: 0,
  gameVersion: 0,
  beatmapMD5: '',
  playerName: '',
  replayMD5: '',
  number_300s: 0,
  number_100s: 0,
  number_50s: 0,
  gekis: 0,
  katus: 0,
  misses: 0,
  score: 0,
  max_combo: 0,
  perfect_combo: 0,
  mods: 0,
  life_bar: '',
  timestamp: 0,
  replay_length: 0,
  replay_data: '',
  unknown: 0
}
```

#### replay.serialize()
Promise version of replay.serialize().

#### replay.write(path(err, Buffer))
Asynchronous version of replay.writeSync()

#### replay.writeSync(path)
Writes replay into a file specified by `path`

#### replay.serialize((err, Buffer))
Asynchronous version of replay.serializeSync().

#### replay.serializeSync()
Returns the Buffer of the replay.

## Related libraries
[osureplayparser](https://github.com/Swan/osuReplayParser) - Clearly formatted replay reading based on this library

## License
MIT