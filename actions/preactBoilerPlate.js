const inquirer = require('inquirer'),
    chalk = require('chalk'),
    spinner = require('./spinner'),
    git = require('git-cli').Repository,
    questionnaire = require('./questionnaire');

const preactBoilerPlateRepo = 'https://github.com/developit/preact-boilerplate.git';

const preactBoilerPlate = () => {
    console.log('\n');

    let dirName = [{
        name: 'directory',
        type: 'input',
        message: `${chalk.gray('Directory path? [absolute path]\n')}`,
        validate: value => {
            if (value.length) {
                return true;
            } else {
                return 'absolute path required';
            }
        }
    }];

    inquirer
        .prompt(dirName)
        .then(answers => {
            // console.log(`${chalk.green('\n\n?')} ${chalk.bold.gray('git credentials')}`);

            // clone
            git
                .clone(preactBoilerPlateRepo, answers.directory)
                .then(repo => {
                    console.log(`${chalk.green('repository cloned\n')}`);
                    console.log(`${chalk.gray('To start building..')}`);
                    console.log(`${chalk.gray('1. cd into ' + answers.directory)}`);
                    console.log(`${chalk.gray('2. execute npm install')}`);
                    console.log(`${chalk.gray('3. execute npm run dev')}`);
                    console.log(`${chalk.gray('\nFor complete info visit: https://github.com/developit/preact-boilerplate\n\n')}`);

                    let continueOptions = [{
                        name: 'create',
                        type: 'list',
                        message: `${chalk.gray('Checkout another repo?\n\n')}`,
                        choices: [
                            'Yes',
                            'No'
                        ]
                    }];

                    inquirer
                        .prompt(continueOptions)
                        .then(answers => {
                            switch (answers.create) {
                                case 'Yes':
                                    console.log(`${chalk.bold.gray('Exiting...\n')}`);
                                    break;

                                case 'No':
                                    console.log(`${chalk.bold.gray('Exiting...\n')}`);
                                    break;

                                default:
                                    console.log('Invalid selection. Exiting...');
                                    break;
                            }
                        });
                })
                .catch(e => {
                    console.log(e);
                })
        });
};

let repoInputs = repoName => {

}

module.exports = preactBoilerPlate;
