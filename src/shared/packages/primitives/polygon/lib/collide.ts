export const collide = (
	left1: number,
	width1: number,
	left2: number,
	width2: number
): boolean => {
	const right1 = left1 + width1;
	const right2 = left2 + width2;
	return (
		(left1 <= left2 && right1 >= left2) || (left1 <= right2 && right1 >= right2)
	);
};
