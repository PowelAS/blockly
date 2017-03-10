/* eslint-disable */
'use strict';

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    insert = require('gulp-insert'),
    del = require('del'),
    exec = require('child_process').exec;

var DEST_DIR = 'lib';

gulp.task('clean', function (done) {
  del(['lib/*.js'], done);
});

gulp.task('blockly', function () {
  return gulp.src('blockly_compressed.js')
    .pipe(replace(/goog\.global\s*=\s*this;/, 'goog.global=window;'))
    .pipe(insert.wrap(`
      module.exports = (function () {`,
        //....ORIGINAL CODE....
        `Blockly.goog=goog;return Blockly;
      })()`))
    .pipe(gulp.dest(DEST_DIR))
});

gulp.task('blocks', function () {
  return gulp.src('blocks_compressed.js')
    .pipe(insert.wrap(`
      module.exports = function (Blockly) {
        var goog = Blockly.goog;
        Blockly.Blocks={};`,
        //....ORIGINAL CODE....
        `return Blockly.Blocks;
      }`))
    .pipe(gulp.dest(DEST_DIR))
});

gulp.task('js', function () {
  return gulp.src('javascript_compressed.js')
    .pipe(insert.wrap('module.exports = function (Blockly) {', 'return Blockly.JavaScript; }'))
    .pipe(gulp.dest(DEST_DIR))
});

gulp.task('python', function () {
  return gulp.src('python_compressed.js')
    .pipe(insert.wrap('module.exports = function (Blockly) {', 'return Blockly.Python; }'))
    .pipe(gulp.dest(DEST_DIR))
});

gulp.task('en', function () {
  return gulp.src('msg/js/en.js')
    .pipe(replace(/goog\.[^\n]+/g, ''))
    .pipe(insert.wrap('var Blockly = {}; Blockly.Msg={}; module.exports = function(){ ', 'return Blockly.Msg; }'))
    .pipe(gulp.dest(`${DEST_DIR}/i18n/`))
});

gulp.task('pybuild', function (cb) {
  exec('build.py', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build', ['clean', 'blocks', 'blockly', 'en', 'js', 'python']);
gulp.task('default', ['build']);
