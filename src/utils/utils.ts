
export const getRandomInteger = (min:number, max:number) => {
	const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
	const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const randomElement = <El>(elements: El[] | readonly El[]) => elements[getRandomInteger(0, elements.length - 1)];

export const getRandomSlice = <El>(size:number, elements: El[]) => {
	if(size > elements.length) {
		return elements;
	}
	const result: El[] = [];

	while(result.length < size) {
		let element = randomElement(elements);
		while(result.includes(element)) {
			element = randomElement(elements);
		}
		result.push(element);
	}
	return result;
};

export const capitalize = (word: string) => {
	if (!word) {
		return word;
	}

	return word[0].toUpperCase() + word.slice(1);
};

