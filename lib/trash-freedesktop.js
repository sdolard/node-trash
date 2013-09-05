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
trash = require('./trash');

exports.create = (function () {
        /**
        * @class
        * @public
        * @params [{Object}] config
        * @params [{Booleab}] config.debug. Defautl false
        * @event file({String} filePath, {Stats} stats)
        * @event end({Number} totalCount, {Number} totalSize}) > scan finished
        * @event error({Error} err)
        */
        function Trash(config) {
            EventEmitter.call(this);
            config = config || {};
            this._debug = config.debug;
        }
        util.inherits(Trash, EventEmitter);

        Trash.prototype.put= function(files) {
            console.log(addon.delete('foo'));
            console.log(addon.deleteSync('bar'));
            console.log(addon.erase());
        };

        return function(config) {
            return new Trash(config);
        };
}());