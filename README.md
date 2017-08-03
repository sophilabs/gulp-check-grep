# Gulp Check Grep

[![travis][travis-image]][travis-url]
[![coverage][coveralls-image]][coveralls-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]
[![js-semistandard-style][semi-image]][semi-url]
[![license][license-image]][license-url]
[![dependencies][dependencies-image]][dependencies-url]
[![dev-dependencies][dev-dependencies-image]][dev-dependencies-url]

Gulp plugin to detect a pattern through files and fail when found.

An array with patterns can be specified as well.

You can pass a function to invalidate the match.


## Installation

```bash
npm install gulp-check-grep
```

## Usage

```javascript
var gulp = require('gulp');
var gilp = require('gilp')(gulp);
var gulpCheckGrep = require('gulp-check-grep');

gulp.task('check', function () {
  return gulp.src('**/*')
    .pipe(gulpCheckGrep(/console\.log/g, {message: 'console.log not allowed'}))
    .pipe(gulpCheckGrep(/print\(/g, {
      message: 'print call found',
      pass: (line, number, fileObject) => line.endsWith('# noqa')}))
    .pipe(gulpCheckGrep.failOnError());
});
```

## License

Gulp Check Grep is Copyright (c) 2016 sophilabs, inc. It is free software, and may be
redistributed under the terms specified in the [license] file.

## About

[![sophilabs][sophilabs-image]][sophilabs-url]

Gulp Check Grep is maintained and funded by sophilabs, inc. The names and logos for
sophilabs are trademarks of sophilabs, inc.

[license]: /LICENSE
[sophilabs-image]: https://s3.amazonaws.com/sophilabs-assets/logo/logo_300x66.gif
[sophilabs-url]: https://sophilabs.co
[travis-image]: https://img.shields.io/travis/sophilabs/gulp-check-grep.svg?style=flat-square
[travis-url]: https://travis-ci.org/sophilabs/gulp-check-grep
[npm-image]: https://img.shields.io/npm/v/gulp-check-grep.svg?style=flat-square
[npm-url]: https://npmjs.org/packge/gulp-check-grep
[downloads-image]: https://img.shields.io/npm/dm/gulp-check-grep.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/gulp-check-grep
[semi-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[semi-url]: https://github.com/Flet/semistandard
[coveralls-image]: https://img.shields.io/coveralls/sophilabs/gulp-check-grep.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/sophilabs/gulp-check-grep?branch=master
[license-image]: https://img.shields.io/github/license/sophilabs/gulp-check-grep.svg?style=flat-square
[license-url]: /LICENSE
[dependencies-image]: https://david-dm.org/sophilabs/gulp-check-grep.svg?style=flat-square
[dependencies-url]: https://david-dm.org/sophilabs/gulp-check-grep
[dev-dependencies-image]: https://david-dm.org/sophilabs/gulp-check-grep/dev-status.svg?style=flat-square
[dev-dependencies-url]: https://david-dm.org/sophilabs/gulp-check-grep#info=devDependencies
