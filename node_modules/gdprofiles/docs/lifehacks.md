### lifehacks
-------------

Hi there! Today I'm gonna show you some **COOL** lifehacks to *hack* your *life*! **Lets begin**!

## Lifehack №1
If you want to get *weekly demon's* or *daily level's* info or, you should use *getWeeklyDemon* or *getDailyLevel* functions and *getLevelInfo* function. 

```js
let { getWeeklyDemon, getDailyLevel, getLevelInfo } = require('gdprofiles');

let { id: weeklyId, creator: weeklyCreator } = await getWeeklyDemon();
let { id: dailyId, creator: dailyCreator } = await getDailyLevel();

let dailyInfo = await getLevelInfo(dailyId, dailyCreator); // daily level's info!
let weeklyInfo = await getLevelInfo(weeklyId, weeklyCreator); // weekly demon's info!
```

**Easy, maaan!**
