const inquirer = require('inquirer'),
    chalk = require('chalk'),
    exec = require('child_process').exec,
    spinner = require('./spinner'),
    git = require('git-cli').Repository,
    questionnaire = require('./questionnaire');

const reactStarterKitRepo = 'https://github.com/kriasoft/react-starter-kit.git';

const reactStarterKit = () => {
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
            console.log(`${chalk.dim('\n\ncloning.. ')}`);

            // clone
            git
                .clone(reactStarterKitRepo, answers.directory)
                .then(repo => {
                    console.log(`${chalk.green('repository cloned\n')}`);

                    // npm install
                    console.log(`${chalk.dim('\n\installing dependencies..\n')}`);
                    exec(`npm install --prefix ${answers.directory}`, (error, stdout, stderr) => {
                        if (error) console.log(`${chalk.red.bold.underline('exec error:')} ${error}`);
                        if (stderr) console.log(`${chalk.red('shell error:')} ${stderr}`);

                        if (stdout) {
                            console.log(`${chalk.green.bold.underline('Result:')} ${stdout}`);
                            console.log(`${chalk.dim.green('repository cloned\n')}`);
                            console.log(`${chalk.gray('To start building..')}`);
                            console.log(`${chalk.gray('1. cd into ' + answers.directory)}`);
                            console.log(`${chalk.gray('2. execute npm run setup')}`);
                            console.log(`${chalk.gray('3. execute npm start')}`);
                            console.log(`${chalk.gray('\nFor complete info visit: https://github.com/react-boilerplate/react-boilerplate\n\n')}`);
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

module.exports = reactStarterKit;
