export const collide = (
	left1: number,
	width1: number,
	left2: number,
	width2: number
): boolean => {
	return (
		(left1 <= left2 && width1 >= left2) || (left1 <= width2 && width1 >= width2)
	);
};
