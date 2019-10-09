### getDailyLevel
-----------------

getDailyLevel is a function that is getting information about daily level (*logically...*).

#### Examples
-------------

```js
let { getDailyLevel } = require('gdprofiles');

// Get data from daily level!

let daily = await getDailyLevel(); // => Object
```

| Key       | Type    | Description              |
|-----------|---------|--------------------------|
| daily     | Number  | Daily level by increment |
| name      | String  | Level name               |
| id        | Number  | Level's id               |
| creator   | String  | Creator's nickname       |
| diff      | String  | Level's difficulty       |
| featured  | Boolean | Is level featured?       |
| epic      | Boolean | Is level epic?           |
| timestamp | Number  | Last information update  |
