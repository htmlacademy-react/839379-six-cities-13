
export const getRandomInteger = (min:number, max:number) => {
	const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
	const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

export const createUniqueInteger = (min:number, max:number) => {
	const previousValues: number[] = [] ;
	return function () {
		let currentValue = getRandomInteger(min, max);
		if (previousValues.length >= (max - min + 1)) {
			return null;
		}
		while (previousValues.includes(currentValue)) {
			currentValue = getRandomInteger(min, max);
		}
		previousValues.push(currentValue);

		return currentValue;
	};
};
