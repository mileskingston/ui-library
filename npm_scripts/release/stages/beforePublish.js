const Listr = require('listr');
const git = require('../utils/git');

module.exports = {
  title: 'Preparations',
  enabled: ctx => ctx.stages.indexOf('prepare') > -1,
  task: () => new Listr([
    {
      title: 'Checking git status',
      task: async (ctx) => {
        ctx.gitStatusClean = await git.isRepositoryClean();
      }
    },
    {
      title: 'Saving current branch name',
      skip: (ctx) => {
        if (ctx.userBranch) {
          return 'Specified manually';
        }
        return false;
      },
      task: async (ctx) => {
        ctx.userBranch = await git.getCurrentBranch();
      }
    },
    {
      title: 'Stashing local changes',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        if (ctx.gitStatusClean) {
          return 'No need to stash changes';
        }

        return false;
      },
      task: git.stash
    },
    {
      title: 'Checking out and updating develop',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: () => new Listr([
        {
          title: 'Reset current branch',
          task: git.reset
        },
        {
          title: 'Checkout develop',
          task: () => git.checkout('develop')
        },
        {
          title: 'Update develop',
          task: git.update
        }
      ])
    },
    {
      title: 'Checking out and updating master',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: () => new Listr([
        {
          title: 'Checkout master',
          task: () => git.checkout('master')
        },
        {
          title: 'Update master',
          task: git.update
        }
      ])
    }
  ])
};
