export function hexSplit(string) {
	var n = false,
		output = [],
		lastC = '';
	string.split('').forEach(c => {
		if (/[\-_.:]/.test(c))
			lastC += c;
		else if (n === false) {
			n = c.charCodeAt(0);
			lastC += c;
		} else {
			output.push({
				value: (n << 4) | c.charCodeAt(0),
				txt: lastC + c
			});
			n = false;
			lastC = '';
		}
	});
	return output;
}

export function rawSplit(string) {
	return string.split('').map(c => {
		return {
			value: c.charCodeAt(0),
			txt: c
		};
	});
}

export function group(data, groupSize) {
	if (groupSize == 1)
		return data;
	var output = [],
		group = null,
		pos = 0;
	data.forEach(c => {
		if (!group) {
			group = {
				value: c.value,
				txt: c.txt
			};
			pos = 0;
			output.push(group);
		} else {
			group.value = ((group.value * 47) + c.value) & 0xff;
			group.txt += c.txt;
		}
		if (++pos == groupSize)
			group = null;
	});
	return output;
}