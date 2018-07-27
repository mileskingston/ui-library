const execute = require('../utils/execute').execute;
const Listr = require('listr');
const git = require('../utils/git');

module.exports = {
  title: 'Building',
  enabled: ctx => ctx.stages.indexOf('build') > -1,
  task: () => new Listr([
    {
      title: 'Building release',
      task: ctx => new Promise((resolve, reject) => {
        const args = ['-n', '-t ""'];

        if (ctx.dryRun) {
          args.push('--dry-run');
        }

        const cmd = execute('npx', ['standard-version', ...args]);

        cmd.then(resolve)
          .catch(() => reject(new Error('Failed')));

        return cmd;
      })
    },
    {
      title: 'Pushing release branch to origin',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async (ctx) => {
        try {
          const args = ['--follow-tags'];
          if (ctx.forcePush) {
            args.push('--force');
          }
          await git.push('release/next', args);
        } catch (e) {
          throw new Error(
            'Push failed.\n' +
            'If you want to use The Force, rerun "release" stage with "--force-push" option.'
          );
        }
      }
    }
  ])
};
