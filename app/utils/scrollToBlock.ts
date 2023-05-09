export const scrollToBlock = (hash: string) => {
	if (!hash) return;
	document.querySelector('#' + hash)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
};
