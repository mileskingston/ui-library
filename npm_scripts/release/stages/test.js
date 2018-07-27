const Listr = require('listr');
const execa = require('execa');
const axios = require('axios');
const helpers = require('../utils/helpers');
const execute = require('../utils/execute').execute;
const ExecutionError = require('../utils/ExecutionError');

module.exports = {
  title: 'Testing',
  enabled: ctx => ctx.stages.indexOf('test') > -1,
  task: () => new Listr([
    {
      title: 'Running unit tests',
      task: () => new Promise((resolve, reject) => {
        {
          const cmd = execute('npm', ['run', 'test']);

          cmd.then(resolve)
            .catch((e) => {
              reject(new ExecutionError('Failed', e));
            });

          return cmd;
        }
      })
    },
    {
      title: 'Running BackstopJS tests',
      task: () => new Listr([
        {
          title: 'Starting docker-compose',
          task: async () => {
            try {
              await execa.stdout('docker-compose', ['up', '-d']);
            } catch (e) {
              if (e.message.indexOf('connect') > -1) {
                throw new Error('Cannot start styleguide. Ensure you have Docker running.');
              } else {
                throw new Error(e);
              }
            }
          }
        },
        {
          title: 'Waiting for styleguide to fully start',
          task: () => new Promise(async (resolve) => {
            let loaded = false;
            while (!loaded) {
              try {
                // eslint-disable-next-line no-await-in-loop
                const response = await axios.get('http://localhost:3031');
                loaded = response.data
                  .indexOf('Dixons Carphone Living Style Guide') > -1;
              } catch (e) {
                // Do nothing
              }

              if (!loaded) {
                // eslint-disable-next-line no-await-in-loop
                await helpers.sleep(5000);
              }
            }
            resolve();
          })
        },
        {
          title: 'Testing',
          task: () => new Listr([
            {
              title: 'Molecules',
              task: () => new Promise((resolve, reject) => {
                const cmd = execute('npm', ['run', 'backstop', 'test', '--', '--filter=Molecules']);

                cmd.then(resolve)
                  .catch((e) => {
                    reject(new ExecutionError('Failed', e));
                  });

                return cmd;
              })
            },
            {
              title: 'Organisms',
              task: () => new Promise((resolve, reject) => {
                const cmd = execute('npm', ['run', 'backstop', 'test', '--', '--filter=Organisms']);

                cmd.then(resolve)
                  .catch((e) => {
                    reject(new ExecutionError('Failed', e));
                  });

                return cmd;
              })
            },
            {
              title: 'Apps',
              task: () => new Promise((resolve, reject) => {
                const cmd = execute('npm', ['run', 'backstop', 'test', '--', '--filter=Apps']);

                cmd.then(resolve)
                  .catch((e) => {
                    reject(new ExecutionError('Failed', e));
                  });

                return cmd;
              })
            }
          ], {
            concurrent: false
          })
        }
      ])
    }
  ], {
    concurrent: true
  })
};
