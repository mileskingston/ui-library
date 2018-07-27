#!/usr/bin/env node
require('babel-polyfill');

require('./utils/execute');

const Listr = require('listr');
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

const beforePrepare = require('./stages/beforePrepare');
const test = require('./stages/test');
const build = require('./stages/build');
const cleanup = require('./stages/cleanup');

const git = require('./utils/git');
const helpers = require('./utils/helpers');

let context = {
  gitStatusClean: true,
  recreateReleaseBranch: false
};

process.env.FORCE_COLOR = true;

const questions = [
  {
    type: 'list',
    name: 'recreateReleaseBranch',
    message: 'Branch release/next already exists. What do you want to do?',
    choices: [
      {
        name: 'Delete and create again from master',
        value: true
      },
      {
        name: 'Use the existing branch',
        value: false
      }
    ],
    default: true
  }
];

program
  .option('--dry, --dry-run', 'Run only simulation of release process.')
  .option('-v, --verbose', 'Verbose output')
  .option('-q, --quiet', 'Do not output')
  .option(
    '--stages [stage...]',
    'Will run only certain stage. Good for retesting after failed tests.',
    'prepare,test,build,cleanup'
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
  beforePrepare,
  test,
  build,
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
    if (!program.dryRun && await git.isBranchPresent('release/next')) {
      const answers = await inquirer.prompt(questions);
      context.recreateReleaseBranch = answers.recreateReleaseBranch;
    }
    context = Object.assign(
      {},
      context,
      helpers.createContext(context, program)
    );

    await tasks.run(context);

    if (context.stages.length === 4) {
      process.stdout.write(chalk.green(
        'Release prepared. Now, please, open PR on following URL:\n' +
        'http://stash.dsg-i.com/projects/UP/repos/ui-library/compare/commits?sourceBranch=refs/heads/release/next' +
        '\n'
      ));
    } else {
      process.stdout.write(chalk.yellow(
        `Stage${context.stages.length > 1 ? 's' : ''} "${context.stages.join(', ')}" finished.\n`
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
