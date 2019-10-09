### getDifficultyByImg
----------------------

getDifficultyByImg is *my custom function* that allows you to get level's difficulty, is it featured and is it epic by only one link! *It's so cool!*

#### Examples
-------------

```js
let { getDifficultyByImg } = require('gdprofiles');

// For example, we've got a link
// and we need to get level's difficulty,
// is it featured and is it epic by only
// one link. How to do that? Watch carefully:

let link = 'https://gdicon.net/icons/difficulty_04_featured.png';
let { diff, featured, epic } = getDifficultyByImg(link); // => Object

// Really cool!
```

| Key      | Type    | Description        |
|----------|---------|--------------------|
| diff     | String  | Level's difficulty |
| featured | Boolean | Is level featured? |
| epic     | Boolean | Is level epic?     |