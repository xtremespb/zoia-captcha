# Zoia Captcha

Zoia Captcha (zoia-captcha) is a library for captcha generation based on JIMP (no external dependenices like ImageMagick or GD are required). 

## Usage

First, install the latest version of *zoia-captcha* from NPM:

`npm i zoia-captcha --save`

Then you need to include *zoia-captcha* in your code:
```javascript
const captcha = require('zoia-captcha');
```
*zoia-captcha* exports the following methods:
```javascript
getCaptcha = async (code, backgroundChars = backgroundCharsDefault, backgroundColor = backgroudColorDefault)
```
* The mandatory parameter is *code* which represents a string which is displayed on the image
* The first optional parameter is *backgroundChars* (default value is [...'0123456789']) which indicates which characters are displayed on the background as "garbage"
* The second optional parameter is *backgroundColor* (default value is 0xFFFFFFFF) which indicates the background color of the captcha image (it's not recommended to set the opacity to 00 as it makes easier to recognize the captcha image)

The method *getCaptcha* returns a promise and resolves a binary image buffer.

## Examples

To save the result image to a file, you may use the following code:
```javascript
const zcaptcha = require('zoia-captcha');
const fs = require('fs');
const test = async() => {
	const img = await zcaptcha.getCaptcha('1234');
	fs.writeFileSync('image.png', img);
};
test();
```
In the following example there is a 4-digit captcha is returned as an *Express* route:
```javascript
const getCaptcha = async (req, res) => {
    const code = Math.random().toString().substr(2, 4);
    const image = await captcha.getCaptcha(code);
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    return res.end(image, 'binary');
};
```