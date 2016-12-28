'use strict';
var util = require('util');
var gutil = require('gulp-util');
var through = require('through2');


function gulpCheckGrep(pattern, opts) {
  opts = opts || {};

  return through.obj(function (file, enc, cb) {
    var message = opts.message || '';
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-check-grep', 'Streaming not supported'));
      return;
    }
    if (!file.checkGrep) {
      file.checkGrep = {errors: []};
    }
    var contents = file.contents.toString();
    var match = pattern.exec(contents);
    while (match != null) {
      file.checkGrep.errors.push(util.format(
        '%s: "%s" found at position %s.',
        message,
        match[0],
        match.index
      ));
      match = pattern.exec(contents);
    }
    cb(null, file);
  });
};

gulpCheckGrep.failOnError = function() {
  return through.obj(function (file, enc, cb) {
    if (!file.checkGrep || !file.checkGrep.errors.length) {
      cb(null, file);
      return;
    }
    cb(new gutil.PluginError(
      'gulp-check-grep',
      {
        name: 'CheckGrepError',
        message: file.checkGrep.errors.join('\n')
      }
    ));
  });
};

module.exports = gulpCheckGrep;
