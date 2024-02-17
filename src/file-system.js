import { reactive } from "vue";
import { scenarioManager } from "./scenarios/scenario";

export const fileSystem = reactive({
	/** @type {FileSystemFile[]} */
	files: [],
});

/**
 * @returns {FileSystemFile[]}
 */
export function getDesktopFiles() {
	return getFilesForLocation("Desktop", { sort: false });
}

/**
 * @param {string} location
 * @param {{sort:boolean}} options
 * @returns {FileSystemFile[]}
 */
export function getFilesForLocation(location, options = {}) {
	const { sort = true } = options;

	const rootLocation = function (loc) {
		loc = "Root/" + loc;
		if (loc.endsWith("/")) {
			loc = loc.substring(0, loc.length - 1);
		}
		return loc;
	};

	// Add all folders in the current location.
	const dirNames = [];
	let rootedLocation = rootLocation(location);

	for (const file of fileSystem.files) {
		const rootedFileLocation = rootLocation(file.location);

		if (!rootedFileLocation.startsWith(rootedLocation)) {
			continue;
		}

		const fileLocationParts = rootedFileLocation
			.substring(rootedLocation.length)
			.split("/");

		if (fileLocationParts.length < 2) {
			continue;
		}
		const dirName = fileLocationParts[1];
		if (dirNames.includes(dirName)) {
			continue;
		}

		dirNames.push(dirName);
	}

	if (sort) {
		dirNames.sort();
	}

	const dirFiles = dirNames.map((dir) => ({
		location: location,
		name: dir,
		icon: "folder",
		app: "files",
		content: "",
		isDir: true,
	}));

	// Always add the "Desktop" directory, even if it contains no files.
	if (
		location === "" &&
		dirFiles.every((f) => !f.isDir || f.name !== "Desktop")
	) {
		dirFiles.unshift({
			location: location,
			name: "Desktop",
			icon: "desktop",
			app: "files",
			content: "",
			isDir: true,
		});
	}
	// Modify appearance of certain dirs.
	for (const dirFile of dirFiles) {
		if (dirFile.location === "" && dirFile.name === "Desktop") {
			dirFile.icon = "desktop";
		}
	}

	const files = fileSystem.files.filter((f) => f.location === location);

	if (sort) {
		files.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		);
	}

	return dirFiles.concat(files);
}

/**
 * @param {string} location
 * @return {boolean}
 */
export function doesDirExist(location) {
	const filesForDir = getFilesForLocation(location);
	return filesForDir.length > 0;
}

/**
 * Resolves a file link to a real file stored in src/assets/files/scenarios
 * from a scenario file content field.
 *
 * @param {string} link Either "file://<path>" or just "<path>" for a file in the current scenario's dir.
 * @return {string}
 */
export function resolveFileSystemFileLink(link) {
	if (link.startsWith("file://")) {
		link = link.substring("file://".length);
	} else {
		link = scenarioManager.activeScenario.id + "/" + link;
	}

	return link;
}
