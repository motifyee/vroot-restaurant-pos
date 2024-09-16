// classer function for tailwind
export const classMultiplier = (selector: string, classes: string) =>
	classes
		.split(' ')
		.map((cls) => `${selector}:${cls}`)
		.join(' ');
