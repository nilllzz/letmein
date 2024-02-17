import { doesDirExist } from "@/file-system";

/**
 * @param {string} location
 * @param {string[]} args
 * @return {(string|number)[]}
 */
export function cmdProgramCd(location, args) {
	if (args.length > 1) {
		return [1, "Too many parameters"];
	}

	let targetLocation = args[0];

	// "." is current location.
	if (targetLocation === ".") {
		return [0, location];
	}

	// ".." is a dir up. If already at root, just return root.
	if (targetLocation === "..") {
		if (location === "" || !location.includes("/")) {
			return [0, ""];
		}

		const locationParts = location.split("/");
		locationParts.pop();
		return [0, locationParts.join("/")];
	}

	// Root target location if it's not rooted already.
	if (!targetLocation.startsWith("/") && location !== "") {
		targetLocation = location + "/" + targetLocation;
	}

	// Remove any leading or tailing /.
	if (targetLocation.endsWith("/")) {
		targetLocation = targetLocation.substring(0, targetLocation.length - 1);
	}

	// Make sure the target location exists.
	if (!doesDirExist(targetLocation)) {
		return [2, "Invalid directory"];
	}

	return [0, targetLocation];
}
