// A visualiser should take a number from 0-255
// and a short string, and return some version
// of the string, themed based on the number.

var escape = '\u001b';

export default function colourise(code, text) {
	// The colours are: 30-37 for dark foreground
	//                  90-97 for light foreground
	//                  40-47 for dark background
	//                  100-107 for light background
	// ... which is 16 foregrounds and 16 backgrounds
	// for 256 ASCII characters. Most of which will
	// never appear but seems like plenty so let's
	// try that as a first pass.

	// First, let's map `c` around a bit so we can
	// map the colours really trivially without it
	// being too blocky.
	code = ((code * 37 + 137) & 0xFF) ^ 0xEB;
	// The bottom four bits are the background
	// and the top four bits are the foreground.
	let bg = code & 0xF,
		fg = code >> 4;
	bg += bg < 8 ? 30 : 82;
	fg += fg < 8 ? 40 : 92;
	// Build it into an escaped string
	return escape + '[' + bg + ';' + fg + 'm' + text + escape + '[0m';
}
