/*jslint  node: true */
var
util = require('util'),
fs = require('fs'),
path = require('path'),
trash = require('./trash'),

TrashApp = (function() {

	function TrashApp() {
		if (!this.argvInit()){
			return;
		}

		this.trash = trash.create({
			debug: this.debug
		});

		//this.trash.on('file', this.onFile.bind(this));

		this.trash.put({
			files: this.files
		});
	}

	TrashApp.prototype.argvInit = function() {
		/*jslint stupid: true */
		this.program = require('commander');

		this.program
			.version(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'))).version)
			.usage('[options] <directories, files, ...>')
			.option('-d, --debug');

		this.program.parse(process.argv);
		if (this.program.args) {
			this.files = this.program.args[0];
		}

		this.debug = this.program.debug;

		return true;
	};

	return new TrashApp();
}());