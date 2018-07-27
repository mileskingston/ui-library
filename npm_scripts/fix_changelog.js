const fs = require('fs');
const path = require('path');

const changelogContent = fs.readFileSync(
  path.resolve(__dirname, '../CHANGELOG.md'),
  'utf8'
);

fs.writeFileSync(
  path.resolve(__dirname, '../CHANGELOG.md'),
  changelogContent
    .replace(
      /\/compare\/(.+)\.{3}(.+)\)/g,
      '/compare?targetBranch=refs/tags/$1&sourceBranch=refs/tags/$2)'
    )
    .replace('# Change Log', '')
);
