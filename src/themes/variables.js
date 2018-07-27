/* eslint-disable import/no-unresolved */
import currysVariables from './currys.js';
import pcWorldVariables from './pcworld.js';

if (typeof THEME === 'undefined') {
  global.THEME = 'currys';
}

export default THEME === 'currys'
  ? currysVariables
  : pcWorldVariables;
