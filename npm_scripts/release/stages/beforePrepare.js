const Listr = require('listr');
const git = require('../utils/git');
const execute = require('../utils/execute').execute;

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
    },
    {
      title: 'Recreating release/next branch',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        if (!ctx.recreateReleaseBranch) {
          return 'Existing branch will be used';
        }
        return false;
      },
      task: async () => {
        await git.deleteBranch('release/next');
        await git.createBranch('release/next');
      }
    },
    {
      title: 'Checking out release/next',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async () => {
        try {
          await git.createBranch('release/next');
        } catch (e) {
          // Already exists. Just checkout.
        }
        await git.checkout('release/next');
      }
    },
    {
      title: 'Merging develop to release/next',
      skip: (ctx) => {
        if (ctx.dryRun) {
          return 'Dry run';
        }
        return false;
      },
      task: async () => {
        try {
          await git.merge('develop');
        } catch (e) {
          throw new Error(
            'Merge failed. Please, merge branch manually and rerun release (skip "prepare" stage)'
          );
        }
      }
    },
    {
      title: 'Installing npm dependencies',
      task: () => execute('npm', ['install'])
    }
  ])
};
