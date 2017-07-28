const touch = require('touch'),
    chalk = require('chalk'),
    mkdir = require('mkdirp'),
    exec = require('child_process').exec,
    spinner = require('./spinner');

/**
 * @function createReactDirs
 * @desc generate react directories
 */
const createReactDirs = directory => {
    let loader = spinner('Creating React directory..').start();

    try {
        mkdir(directory + '/react-dir/src/actions');
        mkdir(directory + '/react-dir/src/components');
        mkdir(directory + '/react-dir/src/images');
        mkdir(directory + '/react-dir/src/reducers');
        mkdir(directory + '/react-dir/src/styles');
        mkdir(directory + '/react-dir/src/utils');
        touch(directory + '/react-dir/src/index.js');
    } catch (e) {}

    loader.stop();
};

module.exports = createReactDirs;
