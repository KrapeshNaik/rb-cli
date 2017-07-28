const exec = require('child_process').exec,
    chalk = require('chalk');

/**
 * @function listFunction
 * @desc list funcion
 */
const listFunction = (directory, options) => {
    const cmd = 'ls';
    let params = [];

    // 1. read options
    if (options.all) params.push('a');
    if (options.long) params.push('l');

    // 2. generate command
    let fullCommand = params.length ? cmd + ' -' + params.join('') : cmd;

    if (directory)
        fullCommand += ' ' + directory;

    // 3. execute command
    let execCallback = (error, stdout, stderr) => {
        if (error) console.log(`${chalk.red.bold.underline('exec error:')} ${error}`);
        if (stdout) console.log(`${chalk.green.bold.underline('Result:')} ${stdout}`);
        if (stderr) console.log(`${chalk.red('shell error:')} ${stderr}`);
    };

    exec(fullCommand, execCallback);
};

module.exports = listFunction;