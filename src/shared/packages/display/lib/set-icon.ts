export const setIcon = (icon: string): void => {
	let link = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');

	if (!link) {
		link = document.createElement('link');
		link.rel = 'icon';
		document.head.append(link);
	}

	link.href = icon;
};
