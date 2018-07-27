const execa = require('execa');

let output = null;

module.exports = {
  setup: (stdio) => {
    output = stdio;
  },

  /**
   * @param cmd
   * @param args
   * @param opts
   * @returns {*|Promise}
   */
  execute: (cmd, args, opts) => execa(
    cmd,
    args,
    Object.assign(
      {},
      opts,
      { stdio: output }
    )
  )
};
