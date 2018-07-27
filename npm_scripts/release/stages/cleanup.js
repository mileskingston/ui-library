const Listr = require('listr');
const git = require('../utils/git');

module.exports = {
  title: 'Cleanup',
  enabled: ctx => ctx.stages.indexOf('cleanup') > -1,
  task: () => new Listr([
    {
      title: 'Checking out previous branch',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async (ctx) => {
        if (!ctx.userBranch) {
          throw new Error(
          'User branch is unknown. Please, specify it with "--user-branch" option.'
        );
        }
        return git.checkout(ctx.userBranch);
      }
    },
    {
      title: 'Applying stashed changes',
      skip: (ctx) => {
        if (ctx.forceUnstash) {
          return false;
        }
        if (ctx.dryRun) {
          return 'Dry run';
        }
        if (ctx.gitStatusClean) {
          return 'No need to unstash anything';
        }
        return false;
      },
      task: git.unstash
    }
  ])
};
