#!/usr/bin/env node

import commander from 'commander';
import colourise from './colourise';
import emojise from './emojise';
import { hexSplit, rawSplit, group } from './util';

commander
	.version('1.0.0')
	.option('-e, --emoji', 'Use emoji instead of colours')
	.option('-g, --group <group>', 'Group size')
	//.option('-b, --bbq-sauce', 'Add bbq sauce')
	//.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', '//marble')
	.parse(process.argv);

// TODO = allow customisation
var groupSize = parseInt(commander.group || '8', 10),
	format = commander.emoji ? 'emoji' : 'colour';

var visualise;
switch (format) {
	case 'emoji': visualise = emojise; break;
	case 'colour': visualise = colourise; break;
}

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
		line.replace(/[\da-f]{4,}/gi,
			txt => group(hexSplit(txt), groupSize).map(
				data => visualise(data.value, data.txt)).join('')));
}
