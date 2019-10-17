gTTS.js
---

gTTS.js (Google Text to Speech): a ported version of gTTS python library which is
a interface to Google's Text to Speech API. Create an mp3 file with the gTTS
module or gtts-cli command line utility. It allows for unlimited lengths of
spoken text by tokenizing long sentences where the speech would naturally pause.


## Install

`npm install gtts`

## How to use

### Use save method

```
const gTTS = require('gtts');
var gtts = new gTTS('text to speak', 'en');
gtts.save('/tmp/hello.mp3', function (err, result) {
  if(err) { throw new Error(err) }
  console.log('Success! Open file /tmp/hello.mp3 to hear result.');
});
```

### Use stream method

```
const express = require('express');
const app = express();
const Gtts = require('gtts');

app.get('/hear', function (req, res) {
  const gtts = new Gtts(req.query.text, req.query.lang);
  gtts.stream().pipe(res);
});

app.listen(3000, function () {
  console.log('Open url to hear Hallelujah http://localhost:3000/hear?lang=en&text=Hallelujah');
});
```


## Command line utility

```
./bin/gtts --help
./bin/gtts "hello Google Text to Speech" -l en -o /tmp/hello-google.mp3
```
## Supported languages

* 'af' : 'Afrikaans'
* 'sq' : 'Albanian'
* 'ar' : 'Arabic'
* 'hy' : 'Armenian'
* 'ca' : 'Catalan'
* 'zh' : 'Chinese',
* 'zh-cn' : 'Chinese (Mandarin/China)'
* 'zh-tw' : 'Chinese (Mandarin/Taiwan)'
* 'zh-yue' : 'Chinese (Cantonese)'
* 'hr' : 'Croatian'
* 'cs' : 'Czech'
* 'da' : 'Danish'
* 'nl' : 'Dutch'
* 'en' : 'English'
* 'en-au' : 'English (Australia)'
* 'en-uk' : 'English (United Kingdom)'
* 'en-us' : 'English (United States)'
* 'eo' : 'Esperanto'
* 'fi' : 'Finnish'
* 'fr' : 'French'
* 'de' : 'German'
* 'el' : 'Greek'
* 'ht' : 'Haitian Creole'
* 'hi' : 'Hindi'
* 'hu' : 'Hungarian'
* 'is' : 'Icelandic'
* 'id' : 'Indonesian'
* 'it' : 'Italian'
* 'ja' : 'Japanese'
* 'ko' : 'Korean'
* 'la' : 'Latin'
* 'lv' : 'Latvian'
* 'mk' : 'Macedonian'
* 'no' : 'Norwegian'
* 'pl' : 'Polish'
* 'pt' : 'Portuguese'
* 'pt-br' : 'Portuguese (Brazil)'
* 'ro' : 'Romanian'
* 'ru' : 'Russian'
* 'sr' : 'Serbian'
* 'sk' : 'Slovak'
* 'es' : 'Spanish'
* 'es-es' : 'Spanish (Spain)'
* 'es-us' : 'Spanish (United States)'
* 'sw' : 'Swahili'
* 'sv' : 'Swedish'
* 'ta' : 'Tamil'
* 'th' : 'Thai'
* 'tr' : 'Turkish'
* 'vi' : 'Vietnamese'
* 'cy' : 'Welsh'

## Contributors

* Eduardo San Martin Morote (posva)
* Long Nguyen (olragon)