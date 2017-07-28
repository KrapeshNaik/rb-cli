const ora = require('ora');

module.exports = text => ora({
    text: text,
    color: 'gray',
    spinner: {
        interval: 120,
        frames: [
            "▹▹▹",
            "▸▹▹",
            "▹▸▹",
            "▹▹▸"
        ]
    }
});
