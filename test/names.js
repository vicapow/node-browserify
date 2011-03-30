var assert = require('assert');
var browserify = require('browserify');
var Script = process.binding('evals').Script;

exports.named = function () {
    var src = browserify.bundle({
        base : { names : __dirname + '/names' }
    });
    
    var c = {};
    Script.runInNewContext(src, c);
    
    var names = Script.runInNewContext('require("names")', c).names;
    assert.eql(names, {
        __dirname : 'names',
        __filename : 'names/index.js',
    });
};

exports.names = function () {
    var src = browserify.bundle(__dirname + '/names');
    
    var c = {};
    Script.runInNewContext(src, c);
    
    var names = Script.runInNewContext('require("./index")', c).names;
    assert.eql(names, {
        __dirname : '.',
        __filename : './index.js',
    });
};
