const { src, dest, watch } = require('gulp');
const path = require('path');

/**
 * Copy icons to dist folder
 */
function copyIcons() {
  return src('nodes/**/*.svg')
    .pipe(dest('dist/nodes'));
}

/**
 * Watch for icon changes
 */
function watchIcons() {
  return watch('nodes/**/*.svg', copyIcons);
}

/**
 * Build task
 */
exports.build = copyIcons;

/**
 * Build icons specifically
 */
exports['build:icons'] = copyIcons;

/**
 * Watch task
 */
exports.watch = watchIcons;

/**
 * Default task
 */
exports.default = copyIcons;
