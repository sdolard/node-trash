/*jslint node: true, unparam: false*/
/*
Copyright © 2013 by Sebastien Dolard (sdolard@gmail.com)


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*/

var
fs = require('fs'),
util = require('util'),
path = require('path'),
EventEmitter = require('events').EventEmitter,
UNSUPPORTED_PLATFORM = 'Not supported on this platform.';

/**
* @class
* @public
* @params [{Object}] config
* @params [{Booleab}] config.debug. Defautl false
* @event file({String} filePath, {Stats} stats)
* @event end({Number} totalCount, {Number} totalSize}) > scan finished
* @event error({Error} err)
*/
function AbstractTrash(config) {
    EventEmitter.call(this);
    config = config || {};
    this._debug = config.debug;
}
util.inherits(AbstractTrash, EventEmitter);
exports.AbstractTrash = AbstractTrash;


AbstractTrash.prototype.delete = function(files) {
    /*jslint unparam: true */
    console.error(UNSUPPORTED_PLATFORM);
};

AbstractTrash.prototype.erase = function() {
    console.error(UNSUPPORTED_PLATFORM);
};

AbstractTrash.prototype.getUserMainTrashDirectory = function() {
    console.error(UNSUPPORTED_PLATFORM);
};

AbstractTrash.prototype.createUserMainTrashDirectory = function() {
    console.error(UNSUPPORTED_PLATFORM);
};


/**
* Log only if debug is positive
* @private
*/
AbstractTrash.prototype.debug = function() {
    if (!this._debug) {
        return;
    }
    var
    args = arguments,
    v = parseInt((new Date()).getTime(), 10) + ' debug AbstractTrash # ';
    args[0] = args[0].replace('\n', '\n' + v);
    args[0] = v.concat(args[0]);
    console.error.apply(console, args);
};

/**
* @private
*/
AbstractTrash.prototype._eexception = function(exception) {
    var error;
    if (exception instanceof Error) {
        error = exception;
    } else {
        error = new Error(exception.message);
        Error.captureStackTrace(error, AbstractTrash.prototype._eexception); // we do not trace this function
        error.code = exception.code;
    }

    this.emit('error', error);
    this.debug(error.stack);
};

