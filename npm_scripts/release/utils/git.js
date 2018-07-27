const execa = require('execa');
const execute = require('./execute').execute;

const isRepositoryClean = async () => {
  const result = await execa.stdout('git', ['status', '--porcelain']);

  return result === '';
};

const getCurrentBranch = async () =>
  execa.stdout('git', ['rev-parse', '--abbrev-ref', 'HEAD']);

const stash = async () => execute('git', ['stash']);

const unstash = async () => execute('git', ['stash', 'apply']);

const reset = async () => execute('git', ['reset', '--hard']);

const checkout = async branch => execute('git', ['checkout', branch]);

const update = async () => execute('git', ['pull', '--rebase']);

const merge = async branch => execute('git', ['merge', branch]);

const push = async (branch, args) =>
  execute('git', ['push', 'origin', `${branch}:${branch}`, ...args]);

const isBranchPresent = async (branch) => {
  try {
    await execute('git', ['show-branch', '--list', branch]);
    return true;
  } catch (e) {
    return false;
  }
};

const createBranch = async branch =>
  execute('git', ['branch', branch]);

const deleteBranch = async branch =>
  execute('git', ['branch', '-D', branch]);

module.exports = {
  isRepositoryClean,
  getCurrentBranch,
  stash,
  unstash,
  reset,
  checkout,
  update,
  merge,
  push,
  isBranchPresent,
  createBranch,
  deleteBranch
};
