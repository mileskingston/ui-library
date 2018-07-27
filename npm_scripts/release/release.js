#!/usr/bin/env node
const program = require('commander');

program
  .command('prepare', 'Prepare a release')
  .command('publish', 'Publish prepared release')
  .parse(process.argv);
