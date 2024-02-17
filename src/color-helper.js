function componentToHex(c) {
	return c.toString(16).padStart(2, "0");
}

/**
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @returns {String}
 */
export function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (result) {
		return {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		};
	}
	return { r: 0, g: 0, b: 0 };
}
