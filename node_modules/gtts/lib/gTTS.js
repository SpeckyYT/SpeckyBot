const request = require('request');
const escapeStringRegexp = require('escape-string-regexp');
const gToken = require('./gToken');
const async = require('async');
const fs = require('fs');
const MultiStream = require('multistream');

function gTTS(text, lang, debug) {
  lang = lang || 'en';
  debug = debug || false;
  var text_parts = [];
  this.GOOGLE_TTS_URL = 'https://translate.google.com/translate_tts';
  this.MAX_CHARS = 100;
  this.LANGUAGES = {
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'ca': 'Catalan',
    'zh': 'Chinese',
    'zh-cn': 'Chinese (Mandarin/China)',
    'zh-tw': 'Chinese (Mandarin/Taiwan)',
    'zh-yue': 'Chinese (Cantonese)',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'en-au': 'English (Australia)',
    'en-uk': 'English (United Kingdom)',
    'en-us': 'English (United States)',
    'eo': 'Esperanto',
    'fi': 'Finnish',
    'fr': 'French',
    'de': 'German',
    'el': 'Greek',
    'ht': 'Haitian Creole',
    'hi': 'Hindi',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'la': 'Latin',
    'lv': 'Latvian',
    'mk': 'Macedonian',
    'no': 'Norwegian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'pt-br': 'Portuguese (Brazil)',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sr': 'Serbian',
    'sk': 'Slovak',
    'es': 'Spanish',
    'es-es': 'Spanish (Spain)',
    'es-us': 'Spanish (United States)',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'ta': 'Tamil',
    'th': 'Thai',
    'tr': 'Turkish',
    'vi': 'Vietnamese',
    'cy': 'Welsh'
  }
  this.debug = debug;

  if (!this.LANGUAGES[lang.toLowerCase()])
    throw new Error('Language not supported: ' + lang);
  else
    this.lang = lang.toLowerCase();

  if (!text)
    throw new Error('No text to speak');
  else
    this.text = text

  if (text.length <= this.MAX_CHARS)
    text_parts = [text]
  else
    text_parts = this._tokenize(text, this.MAX_CHARS);

  // Clean
  text_parts = text_parts.map(function (p) {
    return p.replace(/\\n/g, '').trim()
  });
  text_parts = text_parts.filter(function (p) {
    return p.length > 0;
  });

  this.text_parts = text_parts;
  this.token = gToken;
  return this;
}

gTTS.prototype.getHeader = function () {
  return {
    "Referer" : "http://translate.google.com/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
  };
}

gTTS.prototype.getPayload = function (part, idx) {
  var self = this;
  return {
    'ie' : 'UTF-8',
    'q' : part,
    'tl' : self.lang,
    'total' : self.text_parts.length,
    'idx' : idx,
    'client' : 'tw-ob',
    'textlen' : part.length,
    'tk' : self.token(part)
  };
}

gTTS.prototype.stream = function () {
  var self = this;
  return MultiStream(this.text_parts.map(function (part, idx) {
    var headers = self.getHeader();
    var payload = self.getPayload(part, idx);

    if (self.debug) {
      console.log(payload);
    }

    return request({
      uri: self.GOOGLE_TTS_URL,
      headers: headers,
      qs: payload,
      method: 'GET'
    });
  }));
}

gTTS.prototype.save = function (save_file, callback) {
  var self = this;
  async.eachSeries(self.text_parts, function (part, cb) {
    var idx = self.text_parts.indexOf(part);
    var headers = self.getHeader();
    var payload = self.getPayload(part, idx);

    if (self.debug) {
      console.log(payload);
    }

    var writeStream = fs.createWriteStream(save_file, { flags: idx > 0 ? 'a' : 'w' });
    request({
      uri: self.GOOGLE_TTS_URL,
      headers: headers,
      qs: payload,
      method: 'GET'
    })
    .pipe(writeStream);
    writeStream.on('finish', cb);
    writeStream.on('error', cb);
  }, callback);
}

gTTS.prototype._tokenize = function (text, max_size) {
  var self = this;
  var punc = '¡!()[]¿?.,;:—«»\n';
  var punc_list = punc.split('').map(function (char) {
    return escapeStringRegexp(char);
  });

  var pattern = punc_list.join('|');
  var parts = text.split(new RegExp(pattern));
  var min_parts = [];
  for (var i=0; i<parts.length; i++) {
    min_parts = min_parts.concat(self._minimize(parts[i], ' ', max_size));
  }
  return min_parts;
}

gTTS.prototype._minimize = function (thestring, delim, max_size) {
  var self = this, idx;
  var result = [];
  if (thestring.length > max_size) {
    idx = thestring.lastIndexOf(delim);
    return result.concat([thestring.substring(0, idx)], self._minimize(thestring.substring(idx, thestring.length), delim));
  } else {
    return [thestring];
  }
}

module.exports = gTTS;
