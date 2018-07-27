UI library supports all popular browsers, including Internet Explorer 9 and above, although some polyfills are required for older browsers:

Make sure to include polyfills for following JS features (if you need to support browsers which do not support them):

- fetch - recommended: [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
- promises - recommended: [core-js/es6/promise](https://github.com/zloirock/core-js#ecmascript-6-promise)
- Map - recommended: [core-js/es6/map](https://github.com/zloirock/core-js#map)
- Set - recommended: [core-js/es6/set](https://github.com/zloirock/core-js#set)
- ES6 array functions - recommended [core-js/es6/array](https://github.com/zloirock/core-js#ecmascript-6-array)
- requestAnimationFrame (for IE < 10) - recommended [raf](https://www.npmjs.com/package/raf)

Note: Styleguide itself is executable in IE 11+
