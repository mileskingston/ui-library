const fs = require('fs');
const path = require('path');

const changelogContent = fs.readFileSync(
  path.resolve(__dirname, '../src/atoms/icons/index.js'),
  'utf8'
);

fs.writeFileSync(
  path.resolve(__dirname, '../src/atoms/icons/index.js'),
  changelogContent
    .replace(
      /class=/g,
      'className='
    )
);
