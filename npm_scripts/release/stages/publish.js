const Listr = require('listr');
const git = require('../utils/git');
const execute = require('../utils/execute').execute;
const commandExistsSync = require('command-exists').sync;

module.exports = {
  title: 'Publish',
  enabled: ctx => ctx.stages.indexOf('publish') > -1,
  task: () => new Listr([
    {
      title: 'Publishing to Artifactory',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async () => execute('npm', ['publish'])
    },
    {
      title: 'Building styleguide',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async () => execute('npm', ['run', 'build'])
    },
    {
      title: 'Publishing styleguide',
      skip: (ctx) => {
        if (!commandExistsSync('passh')) {
          ctx.publishSkipped = true;
          return 'Utility "passh" not available. ' +
            'Please, publish styleguide manually by running "npm run deploy:dev -- --user common"';
        }
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async () =>
        execute('passh', ['-p', 'welcome', 'npm', 'run', 'deploy:dev', '--', '--user', 'common'])
    },
    {
      title: 'Checking out and updating develop',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async () => {
        await git.checkout('develop');
        await git.update();
      }
    },
    {
      title: 'Merging master to develop',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async () => git.merge('master')
    },
    {
      title: 'Pushing develop to origin',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async (ctx) => {
        try {
          const args = [];
          if (ctx.forcePush) {
            args.push('--force');
          }
          await git.push('develop', args);
        } catch (e) {
          throw new Error('Cannot push to develop. Please update origin/develop manually.');
        }
      }
    },
    {
      title: 'Removing branch release/next',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async () => git.deleteBranch('release/next')
    }
  ])
};
