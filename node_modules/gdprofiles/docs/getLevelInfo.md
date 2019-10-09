### getLevelInfo
----------------

getLevelInfo will get to you all level information!

#### Examples
-------------

```js
let { getLevelInfo } = require('gdprofiles');

// Let's get Knots's "Somnambulist journey"
// level info!

let journey = await getLevelInfo(49681756, 'Knots'); // => Object
```

| Key        | Type   | Description             |
|------------|--------|-------------------------|
| level      | String | Level's name            |
| desc       | String | Level's description     |
| stars      | Number | Level's stars           |
| coins      | Number | Level's coins count     |
| downloads  | Number | Level's donwloads count |
| likes      | Number | Level's likes count     |
| length     | String | Level's length          |
| soundtrack | Object | Level's song info       |
| infos      | Object | Table "infos"           |