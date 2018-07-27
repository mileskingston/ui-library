const execaSetup = require('./execute').setup;

const sleep = timeout => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});

const createContext = (context, program) => {
  execaSetup(program.verbose ? 'inherit' : null);

  return {
    dryRun: program.dryRun,
    skipStages: program.skip.split(','),
    userBranch: program.userBranch,
    forceUnstash: program.forceUnstash,
    forcePush: program.forcePush,
    stages: program.stages
      .split(',')
      .filter(stage => program.skip.split(',').indexOf(stage) < 0)
  };
};

module.exports = {
  sleep,
  createContext
};
