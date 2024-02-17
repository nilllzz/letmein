import { doesDirExist, resolveRelativePath } from "@/file-system";

/**
 * @param {string} location
 * @param {string[]} args
 * @return {(string|number)[]}
 */
export function cmdProgramCd(location, args) {
	if (args.length > 1) {
		return [1, "Too many parameters"];
	}

	const targetLocation = resolveRelativePath(location, args[0]);
	// Make sure the target location exists.
	if (!doesDirExist(targetLocation)) {
		return [2, "Invalid directory"];
	}

	return [0, targetLocation];
}
