
const sentenceEndingRegex = /([^\.!\?\n\r]+[\.!\?\n\r]+)|([^\.!\?\n\r]+$)/;
const alphaNumericsOnlyRegex = /[^0-9a-zA-Z']/gi;
const alphabetOnlyRegex = /[^a-z]/gi;

const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

const byCount = function(a,b) {
	const delta = b.count - a.count;
	if (delta === 0) {
		return a.word > b.word;
	} 
	return delta;
}

export function countLetters(text = '') {
	const letters = {};
	let total = 0;
	
	text
		.toLowerCase()
		.replace(alphabetOnlyRegex, '')
		.split('')
		.forEach((c) => {
			letters[c] = (letters[c] || 0) + 1;
			total++;
		});

	return alphabet.map((c) => ({
		letter: c,
		count: letters[c] || 0,
		frac: (letters[c] || 0) / total
	}));
};

export function countWords(text = '') {
	const words = {};
	text
		.replace(alphaNumericsOnlyRegex, ' ')
		.toUpperCase()
		.split(' ')
		.forEach((current) => {
			if (current.length > 0) {
				words[current] = (words[current] || 0) + 1;
			}
		});

	const stats = Object.keys(words).map((w) => ({ word: w, count: words[w] }));
	return [].concat(stats).sort(byCount);
};

export function countSentences(text = '') {
	const sentences = [];
	let order = 0;
	text
		.split(sentenceEndingRegex)
		.forEach((s) => {
			 const words = countWords(s);
			 if (words.length > 0) {
				let total = words.reduce((acc, curr) => acc + curr.count, 0);
			 	sentences.push({
			 		order: order,
			 		words: words,
			 		total: total
			 	});
			 	order++;
			 }
		});

	return sentences;
}

