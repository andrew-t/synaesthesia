import { colourise, emojise } from '../src/visualise';
import 'colors';
import 'should';

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
		var str = colourise('12345');
		console.log(str);
		str.length.should.be.greaterThan(5);
	});

	it('should be deterministic', () => {
		for (let i = 0; i < 10000; ++i) {
			let str = i.toString(16);
			colourise('12345').should.equal(colourise('12345'));
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