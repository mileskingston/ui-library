const THEME = process.env.THEME || 'currys';

const THEME_CONFIG = {
  currys: 3031,
  pcworld: 3032
};

const PORT = THEME_CONFIG[THEME];

module.exports = function createConfig(branch, scenarios) {
  return {
    id: 'ui-library',
    viewports: [
      {
        label: 'default',
        width: 1024,
        height: 768
      }
    ],
    onBeforeScript: 'chromy/onBefore.js',
    onReadyScript: 'chromy/onReady.js',
    scenarios: scenarios.map(scenario => ({
      ...scenario,
      url: scenario.url.replace('{PORT}', PORT)
    })),
    paths: {
      bitmaps_reference: `backstop_data/bitmaps_reference/${THEME}/${branch}`,
      bitmaps_test: `backstop_data/bitmaps_test/${THEME}/${branch}`,
      engine_scripts: 'backstop_data/engine_scripts',
      html_report: `backstop_data/html_report/${THEME}/${branch}`,
      ci_report: `backstop_data/ci_report/${THEME}/${branch}`
    },
    report: ['browser'],
    engine: 'chrome',
    engineFlags: [],
    asyncCaptureLimit: 10,
    asyncCompareLimit: 100,
    debug: false,
    debugWindow: false
  };
};
