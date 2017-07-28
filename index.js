#!/usr/bin/env node

'use strict';

// npm modules
const program = require('commander'),
    pkg = require('./package.json');

// local modules
const listFunction = require('./actions/listFunction'),
    questionnaire = require('./actions/questionnaire'),
    welcome = require('./actions/welcome');

// welcome message
welcome();

// ask
questionnaire();

/**
 * initialize
 */
program
    .version(pkg.version)
    .command('list [directory]')
    .description('List files and folders')
    .option('-a, --all', 'List all folders and folders')
    .option('-l, --long', '')
    .action(listFunction);

program.parse(process.argv);
