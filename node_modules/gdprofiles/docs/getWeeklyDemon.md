### getWeeklyDemon
------------------

getWeeklyDemon allows you to get information about weekly demon. It's cool, isn't it?

#### Examples
-------------

```js
let { getWeeklyDemon } = require('gdprofiles');

// Let's get weekly demon's data!

let weekly = await getWeeklyDemon(); // => Object

// Nothing complicated, is it?
```

| Key       | Type    | Description               |
|-----------|---------|---------------------------|
| weekly    | Number  | Weekly level by increment |
| id        | Number  | Level's id                |
| name      | String  | Level name                |
| creator   | String  | Creator's nickname        |
| diff      | String  | Level's difficulty        |
| featured  | Boolean | Is level featured?        |
| epic      | Boolean | Is level epic?            |
| timestamp | Number  | Last information update   |