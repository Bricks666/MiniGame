export const pressedKeys: Record<string, boolean> = {};

export const keyNames = {
	SPACE: ' ',
	RIGHT: 'ARROWRIGHT',
	LEFT: 'ARROWLEFT',
	LEFT_MOUSE: 1,
	RIGHT_MOUSE: 2,
};

document.addEventListener('keydown', (evt) => {
	pressedKeys[evt.key.toUpperCase()] = true;
});

document.addEventListener('keyup', (evt) => {
	pressedKeys[evt.key.toUpperCase()] = false;
});

document.addEventListener('mouseup', (evt) => {
	pressedKeys[evt.button] = true;
});

document.addEventListener('mousedown', (evt) => {
	pressedKeys[evt.button] = false;
});
