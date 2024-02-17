import { getFilesForLocation } from "@/file-system";

/**
 * @param {string} location
 * @param {string[]} args
 * @return {(number|string)[]}
 */
export function cmdProgramDir(location) {
	const output = [0];

	output.push(" ");
	output.push(" Directory of " + getLocationDisplay(location));
	output.push(" ");

	output.push(createContentLine(".", "<DIR>"));

	if (location !== "") {
		output.push(createContentLine("..", "<DIR>"));
	}

	const dirsAndFiles = getFilesForLocation(location, { sort: true });
	const dirs = dirsAndFiles.filter((f) => f.isDir);
	const files = dirsAndFiles.filter((f) => !f.isDir);

	for (const dir of dirs) {
		output.push(createContentLine(dir.name, "<DIR>"));
	}

	let totalFileSize = 0;
	for (const file of files) {
		const fileSize = file.content.length;
		output.push(createContentLine(file.name, fileSize));
		totalFileSize += fileSize;
	}

	output.push(" ");

	const fileCounter = (files.length + " file(s)").padEnd(11, " ");
	const fileSizeDisplay = (
		totalFileSize.toLocaleString("en-US") + " bytes"
	).padStart(18, " ");
	output.push("         " + fileCounter + fileSizeDisplay);

	output.push("         " + dirs.length + " dir(s)");

	return output;
}

/**
 * @param {string} fullname
 * @param {string|number} sizeOrType
 */
function createContentLine(fullname, sizeOrType) {
	let line = "";

	let extension = "";
	const extMatches = fullname.toUpperCase().match(/.+\.(.+){1,5}/);
	if (extMatches && extMatches.length > 0) {
		extension = extMatches[1];
	}

	let dosName = fullname.toUpperCase();
	if (extension.length > 0) {
		dosName = dosName.substring(0, dosName.length - extension.length - 1);
	}
	if (dosName.length > 8) {
		dosName = dosName.substring(0, 6) + "~1";
	}

	dosName = dosName.padEnd(8, " ");
	line += dosName + " ";

	extension = extension.padEnd(5, " ");
	line += extension + " ";

	if (typeof sizeOrType === "string") {
		sizeOrType = sizeOrType.substring(0, 11);
	} else {
		sizeOrType = sizeOrType.toLocaleString("en-US").padStart(11, " ");
	}

	sizeOrType = sizeOrType.padEnd(11, " ");
	line += sizeOrType + "  ";
	line += fullname;

	return line;
}

function getLocationDisplay(location) {
	return "/" + location;
}
