/**
 * Gulpfile for ImNayeon.css
 * By Waren Gonzaga
**/
'use-strict';

// Contants
const gulp         = require('gulp');
const fs           = require("fs");
const sass         = require('gulp-sass');
const clean        = require("gulp-clean");
const rename       = require("gulp-rename");
const header       = require("gulp-header");
const browserSync  = require('browser-sync').create();

// Gulp Paths
const path = {
source: './src/**/*.scss',
build: './prod'
};

// Copyright Label
const pkg = JSON.parse(fs.readFileSync('package.json'));
const copydata = {
    copybanner: [
        '/*!',
        ' * <%= name %> - <%= homepage %>',
        ' * Version: <%= version %>',
        ' * Description - <%= description %>',
        ' * Licensed under the MIT license - http://opensource.org/licenses/MIT',
        ' * Copyright (c) <%= new Date().getFullYear() %> <%= author %>',
        ' * ',
        ' * Facebook: @WarenGonzagaOfficialPage',
        ' * Twitter: @Waren_Gonzaga',
        ' * Github: @WarenGonzaga',
        ' */\n\n',
    ].join('\n'),
};

// Compile SCSS to CSS
function compile() {
    return gulp.src(path.source)
        .pipe(sass())
        .pipe(gulp.dest(path.build))
}
// Minify CSS
function minify() {
    return gulp.src(path.source)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('imnayeon.min.css'))
        .pipe(gulp.dest(path.build))
}
// Add Copyright
function copyright() {
    return gulp
        .src([path.build+'/*.css'], {allowEmpty: true})
        .pipe(header(copydata.copybanner, pkg))
        .pipe(gulp.dest([path.build]));
}
// Copy CSS to Root
function copytoroot() {
    return gulp
        .src(path.build+'/*.css')
        .pipe(gulp.dest('./'));
}
// Clean Build Folder
function cleanprod() {
    return gulp
        .src('./prod')
        .pipe(clean());
}
// Clean CSS in the Root
function cleanroot() {
    return gulp
        .src('./*.css')
        .pipe(clean());
}

// Gulp Series of Tasks
const bunny = gulp.series([compile, minify, copyright, copytoroot]);
const cleandev = gulp.series([cleanprod, cleanroot]);

// For advance users only
exports.copytoroot = copytoroot;
exports.cleanprod = cleanprod;
exports.cleanroot = cleanroot;
exports.clean = cleandev;

// Build imnayeon.css using 'gulp bunny' or simply 'gulp' in your terminal
exports.bunny = bunny; // gulp bunny
exports.default = bunny; // gulp
