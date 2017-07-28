const inquirer = require('inquirer'),
    exec = require('child_process').exec,
    chalk = require('chalk'),
    currentDir = require('current-dir');

const gamesList = () => {
    console.log('\n');

    let repoOptions = [{
        name: 'create',
        type: 'list',
        message: `${chalk.gray('Choose from below\n\n')}`,
        choices: [
            'Battle Ship',
            'Snake',
            'SpaceCrafts',
            'Tanks'
        ]
    }];

    let execCallback = (error, stdout, stderr) => {
        if (error) console.log(`${chalk.red.bold.underline('exec error:')} ${error}`);
        if (stdout) console.log(`${chalk.green.bold.underline('Result:')} ${stdout}`);
        if (stderr) console.log(`${chalk.red('shell error:')} ${stderr}`);
    };

    let currDir = currentDir();

    inquirer
        .prompt(repoOptions)
        .then(answers => {
            switch (answers.create) {
                case 'Battle Ship':
                    exec(`sudo node ${currDir}/node_modules/battleship-game/bin/game.js`, execCallback);
                    break;

                case 'Snake':
                    exec(`sudo node ${currDir}/node_modules/node-games/build/snake.js`, execCallback);
                    break;

                case 'SpaceCrafts':
                    exec('node ../node_modules/node-games/build/spacecraft.js', execCallback);
                    break;

                case 'Tanks':
                    exec('node ../node_modules/node-games/build/tanks.js', execCallback);
                    break;

                default:
                    console.log('Invalid selection. Exiting...');
                    break;
            }
        });
};

module.exports = gamesList;
