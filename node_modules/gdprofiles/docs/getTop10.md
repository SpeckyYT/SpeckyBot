### getTop10
------------

Imho, getTop10 is the simpliest function in this module!

#### Examples
-------------

```js
let { getTop10 } = require('gdprofiles');

// Let me get top 10 users!

let top = await getTop10(); // => Array<Object>

// It returns an array of objects,
// but below I'll describe
// what the object consists of
```

| Key    | Type    | Description                     |
|--------|---------|---------------------------------|
| top    | Number  | Player's top                    |
| nick   | String  | Player's nickname               |
| stars  | Number  | Player's stars                  |
| img    | Object  | Player's icon                   |
| mod    | Boolean | Is user a moderator?            |
| linked | Boolean | Is user linked to a gdprofiles? |