"use strict";

var gulp = require("gulp"),
  scss = require("gulp-sass"),
  concat = require("gulp-concat"),
  ngAnnotate = require("gulp-ng-annotate"),
  webserver = require("gulp-webserver"),
  uglify = require("gulp-uglify");

gulp.task("js", function () {

  gulp.src([
      "builds/dev/app/**/*.js",
      "!builds/dev/app/**/*_test.js"
    ])
    .pipe(concat("app.js"))
    .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(gulp.dest("builds/dev"));

  gulp.src([
      "bower_components/jquery/dist/jquery.js",
      "bower_components/angular/angular.js",
      "bower_components/angular-ui-router/release/angular-ui-router.min.js",
      "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "bower_components/angular-socket-io/mock/socket-io.js",
      "bower_components/angular-socket-io/socket.js",
      "bower_components/angular-websocket/dist/angular-websocket.js"
    ])
    .pipe(concat("libs.js"))
    .pipe(gulp.dest("builds/dev"));

});

gulp.task("scss", function () {

  gulp.src([
      "builds/dev/app/**/*.css",
      "builds/dev/app/**/*.scss",
      "builds/dev/app/**/_*.scss",
      "builds/dev/app/**/business-casual.css",
      "builds/dev/app/**/style.scss"
    ])
    .pipe(scss())
    .pipe(concat("app.css"))
    .pipe(gulp.dest("builds/dev"));

  gulp.src([
      "bower_components/angular/angular-csp.css",
      "bower_components/angular-bootstrap/ui-bootstrap-csp.css",
      "bower_components/bootstrap/dist/css/bootstrap.css"
    ])
    .pipe(concat("theme.css"))
    .pipe(gulp.dest("builds/dev"));

});

gulp.task("watch", function () {

  gulp.watch("builds/dev/app/**/*.js", ["js"]);
  gulp.watch("builds/dev/app/**/*.scss", ["scss"]);

});

gulp.task("webserver", function () {

  gulp.src("builds/dev")
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 5241
    }));

});

gulp.task("default", [

  "js",
  "scss",
  "watch",
  "webserver"

]);