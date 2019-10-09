### getTopCreators
------------------

getTopCreators allows you to get top 10 creators. Amazingly!

#### Examples
-------------

```js
let { getTopCreators } = require('gdprofiles');

// Let's get this top 10!

let top = await getTopCreators(); // Array<Object>

// It returns an array of objects,
// but below I'll describe
// what the object consists of
```

| Key    | Type    | Description                     |
|--------|---------|---------------------------------|
| top    | Number  | Player's top                    |
| nick   | String  | Player's nickname               |
| cp     | Number  | Player's creator points         |
| img    | String  | Player's icon                   |
| mod    | Boolean | Is user a moderator?            |
| linked | Boolean | Is user linked to a gdprofiles? |