#!/usr/bin/env node

import commander from 'commander';
import { colourise, emojise } from './visualise';

commander
	.version('1.0.0')
	//.option('-e, --emoji', 'Use emoji instead of colours')
	//.option('-P, --pineapple', 'Add pineapple')
	//.option('-b, --bbq-sauce', 'Add bbq sauce')
	//.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', '//marble')
	.parse(process.argv);

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
	process.stdout.write(
		line.replace(/[\da-f]{4,}/gi, visualise));
}
