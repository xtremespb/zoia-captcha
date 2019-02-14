const zcaptcha = require('../lib/index');
const fs = require('fs');
const test = async() => {
	const img = await zcaptcha.getCaptcha('1234');
	fs.writeFileSync('image.png', img);
};

test();
