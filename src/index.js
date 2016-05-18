#!/usr/bin/env node

import commander from 'commander';
import colourise from './colourise';
import emojise from './emojise';
import { hexSplit, rawSplit, group } from './util';

commander
	.version('1.0.0')
	.option('-c, --colour', 'Highlight using colours (default)')
	.option('-e, --emoji', 'Highlight using emoji')
	.option('-h, --hex', 'Highlight strings of hex (default)')
	.option('-d, --dec', 'Highlight decimal')
	.option('-b, --base64', 'Highlight base64')
	.option('-r, --raw', 'Highlight everything')
	.option('-g, --group <group>', 'Group size (default: 8)')
	.option('-m, --min <min>', 'Minimum highlight size (default: 8)')
	.option('--md5', 'Highlight MD5 hashes')
	.option('--guid', 'Highlight GUIDs')
	.parse(process.argv);

var groupSize = parseInt(commander.group || '8', 10),
	minSize = parseInt(commander.min || '8', 10),
	visualise,
	split,
	regex;

if (commander.emoji)
	visualise = emojise;
else
	visualise = colourise;

if (commander.md5) {
	commander.raw = false;
	commander.dec = false;
	commander.hex = true;
	minSize = 32;
}

if (commander.guid) {
	// TODO - improve this:
	regex = /([\da-f]{4}){1,3}/gi;
	split = hexSplit;
	groupSize = 12;
	// It probably needs more custom abilities
} else {
	if (commander.raw) {
		regex = '.';
		split = rawSplit;
	} else if (commander.base64) {
		regex = 'a-z\\d+/=';
		split = hexSplit;
	} else if (commander.dec) {
		regex = '\\d';
		split = hexSplit;
	} else {
		regex = '\\da-f';
		split = hexSplit;
	}
	regex = new RegExp(
		'[' + regex + '][' + regex + '\\-:._]' +
		'{' + (minSize - 1) + ',}', 'gi');
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
		line.replace(regex,
			txt => group(split(txt), groupSize).map(
				data => visualise(data.value, data.txt)).join('')));
}
