#!/usr/bin/env node

import commander from 'commander';
import colourise from './colourise';

commander
	.version('1.0.0')
	//.option('-e, --emoji', 'Use emoji instead of colours')
	//.option('-P, --pineapple', 'Add pineapple')
	//.option('-b, --bbq-sauce', 'Add bbq sauce')
	//.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', '//marble')
	.parse(process.argv);

// TODO - allow emojise
var visualise = colourise;

process.stdin.setEncoding('utf8');

var data = '';
process.stdin.on('readable', () => {
	var chunk = process.stdin.read();
	if (chunk) {
		data += chunk;
		var i;
		while ((i = data.indexOf('\n')) >= 0) {
			processLine(data.substr(0, i));
			process.stdout.write('\n');
			data = data.substr(i + 1);
		}
	}
});

process.stdin.on('end', () => {
	processLine(data);
});

function processLine(line) {
	// TODO - allow a mode other than hex
	process.stdout.write(
		line.replace(/[\da-f]{4,}/gi, txt => {
			var n,
				output = '',
				lastC;
			txt.split('').forEach(c => {
				if (!lastC) {
					n = c.charCodeAt(0);
					lastC = c;
				} else {
					output += visualise((n << 4) | c.charCodeAt(0), lastC + c);
					lastC = null;
				}
			});
			if (lastC)
				output += visualise(n, lastC);
			return output;
		}));
}
