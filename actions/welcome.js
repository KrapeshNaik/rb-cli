const figlet = require('figlet'),
    chalk = require('chalk'),
    clear = require('clear');

/**
 * @function
 * @desc show a banner
 */
module.exports = () => {
    clear();
    console.log(chalk.yellow(figlet.textSync('rb-cli', { horizontalLayout: 'full' })));
    // console.log(chalk.red.bold('-- currently in development --\n'));
}
