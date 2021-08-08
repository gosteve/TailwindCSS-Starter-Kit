const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const purgeFromJs = (content) => {
      return content.match(/[\w-/:]+(?<!:)/g);
}


function cleanup(){
    return del([
        'dist/**/*',
      ]);
}

function html () {
  return src('src/*.*')
    .pipe(dest('dist/'));
}

function images () {
    return src('src/img/**')
      .pipe(dest('dist/img/'));
}

function css(){
    return src('src/css/style.css')
    .pipe(purgecss({
        content: ['src/*.html'],
        extractors: [{
            extractor: purgeFromJs,
            extensions: ["html"]
        }]
    }))
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
    ;
}

exports.default = series(cleanup, html, images, css);
