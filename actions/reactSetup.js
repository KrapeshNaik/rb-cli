const reactSetup = () => {
    let pilgrimagesInputs = [{
        name: 'directory',
        type: 'input',
        message: `${chalk.gray('Directory path? [absolute path]\n\n')}`,
        validate: value => {
            if (value.length) {
                return true;
            } else {
                return 'directory path required';
            }
        }
    }];

    inquirer
        .prompt(pilgrimagesInputs)
        .then(answers => {
            createReactDirs(answers.directory);
        });
};

module.exports = reactSetup;