#!/usr/bin/env node
require('babel-polyfill');

const Listr = require('listr');
const program = require('commander');
const chalk = require('chalk');

const beforePublish = require('./stages/beforePublish');
const publish = require('./stages/publish');
const cleanup = require('./stages/cleanup');

const helpers = require('./utils/helpers');

let context = {
  gitStatusClean: true,
  recreateReleaseBranch: false
};

program
  .option('--dry, --dry-run', 'Run only simulation of release process.')
  .option('-v, --verbose', 'Verbose output')
  .option('-q, --quiet', 'Do not output')
  .option(
    '--stages [stage...]',
    'Will run only certain stage. Good for retesting after failed tests.',
    'prepare,publish,cleanup'
  )
  .option(
    '--skip [stage...]',
    'Skip stage or stages. Applied after "stages" option.',
    '""'
  )
  .option(
    '--user-branch [branch]',
    'Specify user branch manually. Good when running only cleanup.'
  )
  .option(
    '--force-unstash',
    'Applies stashed changes. Good when running only cleanup and you know you want to unstash.'
  )
  .option(
    '--force-push',
    'Uses The Force for pushing release/next branch. Use responsibly!'
  )
  .parse(process.argv);

const tasks = new Listr([
  beforePublish,
  publish,
  cleanup
], {
  renderer: (() => {
    if (program.verbose) {
      return 'verbose';
    }
    if (program.quiet) {
      return 'silent';
    }
    return 'default';
  })()
});

(async () => {
  try {
    context = Object.assign(
      {},
      context,
      helpers.createContext(context, program)
    );

    await tasks.run(context);

    if (context.stages.length === 3 && !context.publishSkipped) {
      process.stdout.write(chalk.green(
        'Everything is done. Thank you for contribution!\n'
      ));
    } else {
      process.stdout.write(chalk.yellow(
        `Stage${context.stages.length > 1 ? 's' : ''} "${context.stages.join(', ')}" finished.\n`
      ));
    }

    if (context.stages.indexOf('publish') > -1 && context.publishSkipped === true) {
      process.stdout.write(chalk.yellow(
        'Command "passh" not available.\n' +
        'Please, publish styleguide manually by running "npm run deploy:dev -- --user common"\n'
      ));
    }

    process.exit(0);
  } catch (e) {
    if (e.originalError) {
      process.stderr.write(e.originalError.message);
      process.stderr.write('\n');
    }

    process.stderr.write(e.message);
    process.stderr.write('\n');

    process.exit(1);
  }
})();
