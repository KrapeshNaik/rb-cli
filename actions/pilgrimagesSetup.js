const inquirer = require('inquirer'),
    chalk = require('chalk'),
    spinner = require('./spinner'),
    git = require('git-cli').Repository;

const herculesRepo = 'http://IAS-01.redbus.in/busplushotels/hercules.git',
    zeusRepo = 'http://IAS-01.redbus.in/busplushotels/zeus.git',
    odysseyRepo = 'http://IAS-01.redbus.in/busplushotels/odyssey.git';

const pilgrimagesSetup = () => {
    console.log('\n');

    let repoOptions = [{
        name: 'create',
        type: 'list',
        message: `${chalk.gray('Repository name?\n\n')}`,
        choices: [
            'Hercules [React Frontend setup]',
            'Odyssey [Vue CMS setup]',
            'Zeus [GO api-engine setup]'
        ]
    }];

    inquirer
        .prompt(repoOptions)
        .then(answers => {
            switch (answers.create) {
                case 'Hercules [React Frontend setup]':
                    repoInputs(herculesRepo);
                    break;

                case 'Odyssey [Vue CMS setup]':
                    repoInputs(odysseyRepo);
                    break;

                case 'Zeus [GO api-engine setup]':
                    repoInputs(zeusRepo);
                    break;

                default:
                    console.log('Invalid selection. Exiting...');
                    break;
            }
        });
};

let repoInputs = repoName => {
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
            console.log(`${chalk.green('\n\n?')} ${chalk.bold.gray('git credentials')}`);

            // clone
            git
                .clone(repoName, answers.directory)
                .then(repo => {
                    console.log(`${chalk.green('repository cloned\n\n')}`);

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
                                    pilgrimagesSetup();
                                    break;

                                case 'No':
                                    console.log(`${chalk.bold.gray('Exiting...\n')}`)
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
}

module.exports = pilgrimagesSetup;
