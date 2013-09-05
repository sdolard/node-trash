/*jslint  node: true */
var
util = require('util'),
fs = require('fs'),
path = require('path'),
trash = require('./trash-freedesktop'),

TrashApp = (function() {

	function TrashApp() {
		if (!this.argvInit()){
			return;
		}

		this.trash = trash.create({
			debug: this.debug
		});

		this.runCommands();		
	}

	TrashApp.prototype.argvInit = function() {
		/*jslint stupid: true */
		this.program = require('commander');

		this.program
			.version(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'))).version)
			.usage('[options] <directories, files, ...>')
			.option('-v, --verbose');

		this.program.parse(process.argv);
		if (this.program.args) {
			this.files = this.program.args[0];
		}

		this.debug = this.program.verbose;

		return true;
	};

	TrashApp.prototype.runCommands = function() {
		if (this.files) {
			this.trash.delete(this.files, function(err){
				if (err) {
					switch(err.code) {
					case 'ENOENT': console.error('File do not exists: "%s"', err.path); break;
					default: console.error(err);
					}
					return;
				}
				console.log('%s moved to trash', this.files);
			});
		} else {
			console.error('missing operand');
		}
	};

	return new TrashApp();
}());