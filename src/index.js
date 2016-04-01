import commander from 'commander';
import { colourise, emojise } from './visualise';

commander
	.version('1.0.0')
	//.option('-e, --emoji', 'Use emoji instead of colours')
	//.option('-P, --pineapple', 'Add pineapple')
	//.option('-b, --bbq-sauce', 'Add bbq sauce')
	//.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', '//marble')
	.parse(process.argv);

visualise = colourise;

process.stdin.setEncoding('utf8');

var data = '';
process.stdin.on('readable', () => {
	data += process.stdin.read();
	var i;
	while (i = data.indexOf() >= 0) {
		process.stdout.write(visualise(data.substr(0, i)) + '\n');
		data = data.substr(i + 1);
	}
});

process.stdin.on('end', () => {
  // Do nothing
});


