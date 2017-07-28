const inquirer = require('inquirer');

/**
 * @function questionnaire
 * @desc list of questions
 */
const questionnaire = callback => {
    let questions = [{
        name: 'username',
        type: 'input',
        message: 'Enter your username',
        validate: value => {
            if (value.length) {
                return true;
            } else {
                return 'Enter username'
            }
        }
    }, {
        name: 'password',
        type: 'password',
        message: 'Enter password',
        validate: value => {
            if (value.length) {
                return true;
            } else {
                return 'Enter password';
            }
        }
    }];

    inquirer
        .prompt(questions)
        .then(answers => {
            console.log(answers);
        });
};

module.exports = questionnaire;