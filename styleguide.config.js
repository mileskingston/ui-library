/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const { version } = require('./package.json');

const indexHTML = fs.readFileSync('./index.html');

require('babel-register');

const mockServer = require('./mockServer').default;

const THEME = process.env.THEME || 'currys';

const majorVersionDir = version.split('.')[0] === '3' ? '' : '/v2';

module.exports = {
  title: `Dixons Carphone Living Style Guide Version: ${version} Theme: ${THEME}`,
  assetsDir: path.join(__dirname, 'docs/assets'),
  components: './src/**/*.js',
  ignore: [
    '**/*.codecept.js',
    '**/*.spec.js',
    '**/*.mock.js',
    '**/src/atoms/icons/index.js',
    '**/src/atoms/spacing/variables.js',
    '**/src/organisms/SlideWrapper/index.js',
    '**/src/organisms/SlideWrapper/transition.js'
  ],
  template: {
    favicon: '/icon.png',
    body: {
      raw: indexHTML
    }
  },
  pagePerSection: true,
  serverHost: '0.0.0.0',
  serverPort: parseInt(process.env.PORT || 3001, 10),
  skipComponentsWithoutExample: true,
  styleguideDir: `styleguide${majorVersionDir}/${THEME}`,
  require: [
    'core-js/es6/array',
    'core-js/es6/promise',
    'raf/polyfill',
    'babel-polyfill',
    path.join(__dirname, 'styleguide.custom.css'),
    path.join(__dirname, 'styleguide-utils/index.styl'),
    path.join(__dirname, 'src/style/common.styl')
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/themes/ThemeProvider')
  },
  sections: [
    {
      name: 'Introduction',
      content: 'docs/Introduction.md'
    },
    {
      name: 'How to use',
      sections: [
        {
          name: 'Browser support',
          content: 'docs/HowToUse/BrowserSupport.md'
        },
        {
          name: 'Installation',
          content: 'docs/HowToUse/Installation.md'
        },
        {
          name: 'Configuration',
          content: 'docs/HowToUse/Configuration.md'
        },
        {
          name: 'Development',
          content: 'docs/HowToUse/Development.md'
        }
      ]
    },
    {
      name: 'Migration',
      content: 'docs/Migration/Intro.md',
      sections: [
        {
          name: 'Version 3',
          content: 'docs/Migration/Version-3.md'
        }
      ]
    },
    {
      name: 'How to develop',
      sections: [
        {
          name: 'Contributing',
          content: 'docs/HowToDevelop/Contributing.md'
        },
        {
          name: 'Project integration',
          content: 'docs/HowToDevelop/ProjectIntegration.md'
        },
        {
          name: 'Releasing',
          content: 'docs/HowToDevelop/Releasing.md'
        },
        {
          name: 'i18n',
          content: 'docs/HowToDevelop/i18n.md'
        }
      ]
    },
    {
      name: 'Changelog',
      content: 'CHANGELOG.md'
    },
    {
      name: 'Style guide',
      sections: [
        {
          name: 'Atoms',
          content: 'src/atoms/Readme.md',
          components: 'src/atoms/**/*.js',
          sections: [
            {
              name: 'Colors',
              content: 'src/atoms/colors/Readme.md'
            },
            {
              name: 'Icons',
              content: 'src/atoms/icons/Readme.md'
            },
            {
              name: 'Printing',
              content: 'src/atoms/printing/Readme.md'
            },
            {
              name: 'Typography',
              content: 'src/atoms/typography/Readme.md'
            },
            {
              name: 'Spacing',
              content: 'src/atoms/spacing/Readme.md'
            }
          ]
        },
        {
          name: 'Molecules',
          content: 'src/molecules/Molecules.md',
          components: 'src/molecules/**/*.js'
        },
        {
          name: 'Organisms',
          content: 'src/organisms/Organisms.md',
          components: 'src/organisms/**/*.js'
        },
        {
          name: 'Gadgets',
          content: 'src/gadgets/Gadgets.md',
          components: 'src/gadgets/**/*.js'
        },
        {
          name: 'Apps',
          content: 'src/apps/Apps.md',
          sections: [
            {
              name: 'QuickAccount',
              content: 'src/apps/QuickAccount/Readme.md',
              components: 'src/apps/QuickAccount/*/**/*.js'
            }
          ]
        }
      ]
    }
  ],
  configureServer(app) {
    mockServer(app);
  }
};
