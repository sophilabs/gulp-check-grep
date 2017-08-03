'use strict';
var util = require('util');
var gutil = require('gulp-util');
var through = require('through2');


function gulpCheckGrep(patterns, opts) {
  opts = opts || {};
  if (!(patterns instanceof Array)) {
    patterns = [patterns];
  }
  patterns = patterns.map(p => new RegExp(p));

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

    patterns.forEach(function (pattern) {
      var match = pattern.exec(contents);
      while (match !== null) {
        var lineNumber = (contents.slice(0, match.index).match(/\n/g)||[]).length;
        var line = contents.split('\n')[lineNumber];
        var pass = false;
        if (opts.pass) {
          pass = opts.pass(line, lineNumber, file);
        }
        if (!pass) {
          file.checkGrep.errors.push(util.format(
            '%s: %s "%s" found at line %s.',
            file.path,
            message,
            match[0],
            lineNumber
          ));
          if (pattern.global) {
            match = pattern.exec(contents);
          } else {
            match = null;
          }
        }
      }
    });
    cb(null, file);
  });
}

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
