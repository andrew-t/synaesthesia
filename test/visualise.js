import colourise from '../src/colourise';
import emojise from '../src/emojise';
import 'colors';
import should from 'should';

var escape = '\u001b';

describe('mask', () => {
	it('should leave only colours', () => {
		mask('123'.red + '456'.blue.greenBg).should.be.equal(
			mask('123'.red + '456'.blue.greenBg));
		mask('123'.red + '456'.blue.greenBg).should.not.be.equal(
			mask('123'.red + '456'.green));
		mask('123').should.be.equal('***');
	});
});

describe('colourise', () => {
	it('should colourise a string', () => {
		var str = colourise(12345, '12345');
		console.log(str);
		str.length.should.be.greaterThan(5);
	});

	it('should be deterministic', () => {
		for (let i = 0; i < 256; ++i) {
			let str = i.toString(16);
			colourise(i, str).should.equal(colourise(i, str));
		}
	});
});

describe('emojise', () => {
	it('should emojise a string', () => {
		var str = emojise(53);
		console.log(str);
	});

	it('should be deterministic', () => {
		for (let i = 0; i < 256; ++i) {
			let str = i.toString(16);
			emojise(i).should.equal(emojise(i));
		}
	});

	it('should not repeat itself', () => {
		var used = {};
		for (let i = 0; i < 256; ++i) {
			let e = emojise(i);
			should(used[i]).not.be.ok();
			used[i] = true;
		}
	});
});

function mask(string) {
	// Remove non-escape codes.
	var output = '',
		inCode = false;
	string.split('').forEach(c => {
		if (inCode) {
			output += c;
			if (c == 'm')
				inCode = false;
		} else if (c == escape) {
			inCode = true;
			output += c;
		} else
			output += '*';
	});
	return output;
}