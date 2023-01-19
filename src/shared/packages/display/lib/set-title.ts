export const setTitle = (title: string): void => {
	let titleTag = document.querySelector<HTMLTitleElement>('title');

	if (!titleTag) {
		titleTag = document.createElement('title');
		document.head.append(titleTag);
	}

	titleTag.innerText = title;
};
