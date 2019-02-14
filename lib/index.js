const Jimp = require('jimp');
const utils = require('./utils');

const charsDefault = [...'0123456789'];

exports.getCaptcha = async (code, chars = charsDefault) => {
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const image = await new Jimp(String(code).length * 30 + 30, 50, 0xFFFFFF00);
    const cimage = await new Jimp(30, 30, 0xFFFFFF00);
    const x = utils.getRandomInt(20, 30);
    String(code).split('').map(async (cp, i) => {
        const chr = [...Array(1)].map(() => chars[Math.random() * chars.length | 0])[0]; // eslint-disable-line no-bitwise
        cimage
            .crop(0, 0, 0, 0)
            .crop(0, 0, 30, 30)
            .print(font, 0, 0, chr)
            .rotate(utils.getRandomInt(1, utils.getRandomInt(1, 60), true))
            .opacity(0.6)
            .print(font, 0, 0, cp)
            .resize(20, 20, Jimp.RESIZE_BEZIER)
            .rotate(utils.getRandomInt(1, 15))
            .resize(utils.getRandomInt(40, 42), utils.getRandomInt(40, 42), Jimp.RESIZE_HERMITE)
            .opacity(0.8)
            .dither16();
        image.composite(cimage, x + (i * 20) - utils.getRandomInt(5, 10), utils.getRandomInt(2, 8));
    });
    image.autocrop();
    const buffer = await utils.getImageBuffer(image);
    return buffer;
};