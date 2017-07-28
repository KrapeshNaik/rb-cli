const inquirer = require('inquirer'),
    chalk = require('chalk'),
    exec = require('child_process').exec,
    spinner = require('./spinner'),
    git = require('git-cli').Repository,
    questionnaire = require('./questionnaire');

const angularTwoStarterKitRepo = 'http://IAS-01.redbus.in/rb-frontend/angular2-starter-kit.git';

const angularTwoStarterKit = () => {
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

            // clone repo
            git
                .clone(angularTwoStarterKitRepo, answers.directory)
                .then(repo => {
                    console.log(`${chalk.dim.green('repository cloned\n')}`);

                    // set registries
                    console.log(`${chalk.dim('\nsetting registry..')}`);
                    exec('npm config set "@angular:registry" http://registry.npmjs.org/ && npm config set "@angular2-material:registry" http://registry.npmjs.org/', (error, stdout, stderr) => {
                        if (error) console.log(`${chalk.red.bold.underline('exec error:')} ${error}`);
                        if (stderr) console.log(`${chalk.red('shell error:')} ${stderr}`);

                        if (stdout) {
                            console.log(`${chalk.dim.green('done\n')}`);
                            console.log(`${chalk.dim('\ninstalling dependencies..')}`);
                            npmInstall(answers);
                        }
                    });
                })
                .catch(e => {
                    console.log(e);
                })
        });

    // npm install
    npmInstall = answers => {
        exec(`npm install --prefix ${answers.directory}`, (error, stdout, stderr) => {
            if (error) console.log(`${chalk.red.bold.underline('exec error:')} ${error}`);
            if (stderr) console.log(`${chalk.red('shell error:')} ${stderr}`);

            if (stdout) {
                console.log(`${chalk.gray('To start building..')}`);
                console.log(`${chalk.gray('3. npm install -g webpack && npm install -g typings')}`);
                console.log(`${chalk.gray('4. typings install')}`);
                console.log(`${chalk.gray('4. node app')}`);
                console.log(`${chalk.gray('\nFor complete info visit: http://ias-01.redbus.in/rb-frontend/angular2-starter-kit\n\n')}`);
            }
        });
    };
};

module.exports = angularTwoStarterKit;
