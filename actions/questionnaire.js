const inquirer = require('inquirer'),
    chalk = require('chalk'),
    exec = require('child_process').exec,
    git = require('git-cli').Repository,

    pilgrimagesSetup = require('./pilgrimagesSetup'),
    reactStarterKit = require('./reactStarterKit'),
    preactBoilerPlate = require('./preactBoilerPlate'),
    angularTwoStarterKit = require('./angularTwoStarterKit'),
    vueTwoStarterKit = require('./vueTwoStarterKit'),
    gamesList = require('./gamesList'),
    spinner = require('./spinner');

/**
 * @function questionnaire
 * @desc list of questions
 */
const questionnaire = () => {
    let questions = [{
        name: 'create',
        type: 'list',
        message: `${chalk.gray('What kind of project you would be starting on?\n\n')}`,
        choices: [
            'React Starter Kit',
            'Preact BoilerPlate',
            'Angular 2 Starter Kit [brewed inhouse]',
            'Vue 2 Starter Kit',
            'RedBus Pilgrimages Setup'
        ]
    }];

    inquirer
        .prompt(questions)
        .then(answers => {
            switch (answers.create) {
                case 'React Starter Kit':
                    reactStarterKit();
                    break;

                case 'Preact BoilerPlate':
                    preactBoilerPlate();
                    break;

                case 'Angular 2 Starter Kit [brewed inhouse]':
                    angularTwoStarterKit();
                    break;

                case 'Vue 2 Starter Kit':
                    vueTwoStarterKit();
                    break;

                case 'RedBus Pilgrimages Setup':
                    pilgrimagesSetup();
                    break;

                case 'Bored? How about some games':
                    gamesList();
                    break;

                default:
                    console.log('Invalid selection');
                    break;
            }
        });
};

module.exports = questionnaire;
