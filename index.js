global._ = require('underscore');
const nconf = require('nconf');
nconf.argv()
    .env()
    .file({ file: './config/config.json' });

_.conf = nconf;
require('./lib/index.js');