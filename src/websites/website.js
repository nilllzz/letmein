export default class Website {
	/**
	 * @param {string} url
	 */
	static tryLoad(url) {
		// Make lowercase.
		url = url.toLowerCase();

		let urlObj;
		try {
			urlObj = new URL(url);
		} catch (error) {
			console.debug(
				"Failed to parse input URL, probably contains invalid character sequences.",
				error
			);
			return null;
		}

		const host = urlObj.hostname;
		let path = (urlObj.pathname || "").trim();
		while (path.startsWith("/")) {
			path = path.substring(1);
		}
		while (path.endsWith("/")) {
			path = path.substring(0, path.length - 1);
		}
		// Use "index" document if empty.
		if (path === "") {
			path = "index";
		}

		// www.example.inet => inet, example, www
		const hostParts = host.split(".").reverse();
		const pathParts = path.split("/");

		const filePath = hostParts.concat(pathParts).join("/");

		try {
			const page = require(`./${filePath}.json`);
			// Fill block ids with random numbers if unset.
			for (const block of page.blocks) {
				if (!block.id) {
					block.id = Math.round(Math.random() * 100000).toString();
				}
			}
			return page;
		} catch (error) {
			console.debug(
				"Attempted to load website at",
				url,
				", but an error occurred:",
				error
			);
			return null;
		}
	}
}
