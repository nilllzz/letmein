import { hexToRgb, rgbToHex } from "@/color-helper";

/**
 * @param {HTMLCanvasElement} canvas
 * @param {String} color
 * @param {Number} startX
 * @param {Number} startY
 */
export function floodFill(canvas, fillColor, startX, startY) {
	const startColor = getPixelColor(canvas, startX, startY);
	if (fillColor === startColor) {
		return;
	}

	const ctx = canvas.getContext("2d");

	const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	const pixelStack = [[startX, startY]];

	while (pixelStack.length > 0) {
		const newPos = pixelStack.pop();
		let x = newPos[0];
		let y = newPos[1];

		let pixelPos = (y * ctx.canvas.width + x) * 4;
		while (y-- >= 0 && matchColor(startColor, imgData, pixelPos)) {
			pixelPos -= ctx.canvas.width * 4;
		}

		pixelPos += ctx.canvas.width * 4;
		++y;

		let reachLeft = false;
		let reachRight = false;
		while (
			y++ < ctx.canvas.height - 1 &&
			matchColor(startColor, imgData, pixelPos)
		) {
			setPixel(fillColor, imgData, pixelPos);

			if (x > 0) {
				if (matchColor(startColor, imgData, pixelPos - 4)) {
					if (!reachLeft) {
						pixelStack.push([x - 1, y]);
						reachLeft = true;
					}
				} else if (reachLeft) {
					reachLeft = false;
				}
			}

			if (x < ctx.canvas.width - 1) {
				if (matchColor(startColor, imgData, pixelPos + 4)) {
					if (!reachRight) {
						pixelStack.push([x + 1, y]);
						reachRight = true;
					}
				} else if (reachRight) {
					reachRight = false;
				}
			}

			pixelPos += ctx.canvas.width * 4;
		}
	}

	ctx.putImageData(imgData, 0, 0);
}

/**
 * @param {String} color
 * @param {ImageData} imgData
 * @param {Number} pixelPos
 * @returns {Boolean}
 */
function matchColor(color, imgData, pixelPos) {
	const r = imgData.data[pixelPos];
	const g = imgData.data[pixelPos + 1];
	const b = imgData.data[pixelPos + 2];

	const checkColor = rgbToHex(r, g, b);
	return checkColor === color;
}

/**
 * @param {String} color
 * @param {ImageData} imgData
 * @param {Number} pixelPos
 */
function setPixel(color, imgData, pixelPos) {
	const rgb = hexToRgb(color);
	imgData.data[pixelPos] = rgb.r;
	imgData.data[pixelPos + 1] = rgb.g;
	imgData.data[pixelPos + 2] = rgb.b;
	imgData.data[pixelPos + 3] = 255; // Alpha
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {Number} x
 * @param {Number} y
 * @returns {String}
 */
function getPixelColor(canvas, x, y) {
	const ctx = canvas.getContext("2d");
	const imgData = ctx.getImageData(x, y, 1, 1);
	return rgbToHex(imgData.data[0], imgData.data[1], imgData.data[2]);
}
