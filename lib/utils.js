exports.getImageBuffer = image => new Promise(resolve => image.getBuffer('image/png', (err, buf) => resolve(buf)));

exports.getRandomInt = (low, high) => Math.floor(Math.random() * (high - low) + low);
