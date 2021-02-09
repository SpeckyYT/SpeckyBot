seedRandom = require 'seedrandom'

module.exports = (bot) ->

    Array::seedpick = (seed, pos = 0) ->
        rng = seedRandom seed
        rng() while pos-- >= 0 if Number.isFinite(pos)
        @[Math.floor(@.length * rng())]
