import { persistentAtom } from '@nanostores/persistent';

export const count = persistentAtom<number>('count', 0, {
	encode: (value) => value.toString(),
	decode: (value) => parseInt(value, 10),
});

export const croppedImages = persistentAtom<string[]>('croppedImages', [], {
	encode: (value) => JSON.stringify(value),
	decode: (value) => JSON.parse(value),
});

export const addImage = (image: string): boolean => {
	if (ifImageExists(image)) return false;
	croppedImages.set([...croppedImages.get(), image]);
	count.set(count.get() + 1);
	return true;
}

export const ifImageExists = (image: string): boolean => {
	return croppedImages.get().includes(image);
}