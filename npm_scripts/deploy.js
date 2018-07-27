const argv = require('minimist')(process.argv.slice(2));

const util = require('util');
const spawnSync = require('child_process').spawnSync;

let child;

const USER = argv.user || process.env.USER;

function rsyncSite() {
  const rsyncArgs = ['-Pr', 'styleguide/'];

  if (argv.local) {
    rsyncArgs.push(`/home/${USER}/web_dir/ui-library/www/`);
  } else {
    rsyncArgs.push(`${USER}@10.10.10.12:/home/${USER}/web_dir/ui-library/www/`);
  }

  child = spawnSync('rsync', rsyncArgs, { stdio: 'inherit', stdin: 'inherit' });
}

rsyncSite();
