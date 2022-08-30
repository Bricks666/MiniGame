export const setTitle = (title: string): void => {
	let titleTag = document.querySelector<HTMLTitleElement>('title');

	if (titleTag) {
		titleTag.innerText = title;
		return;
	}

	titleTag = document.createElement('title');
	titleTag.innerText = title;
	document.head.append(titleTag);
};

export const setIcon = (icon: string): void => {
	let link = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
	if (link) {
		link.href = icon;
		return;
	}

	link = document.createElement('link');
	link.href = icon;
	link.rel = 'icon';

	document.head.append(link);
};
