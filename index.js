//const gulp = require('gulp');
const runGulpTask = require('run-gulp-task');

function startServer() { require('./lib/koa-init.js') }

runGulpTask('build', 'gulpfile.js')
    .then(startServer)
    .catch(e => {
        console.log('Project build error: ', e);
    });