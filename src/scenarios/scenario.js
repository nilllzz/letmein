import { reactive } from "vue";
import { fileSystem } from "../file-system";

export class Scenario {
	constructor(id, info, files) {
		/**
		 * @type {string}
		 */
		this.id = id;
		/**
		 * @type {{name:string,difficulty:number}}
		 */
		this.info = info;
		/**
		 * @type {FileSystemFile[]}
		 */
		this.files = files;
	}

	static load(filename) {
		console.debug("Load scenario", filename);

		const json = require(`./${filename}.json`);
		const scenario = new Scenario(filename, json["info"], json["files"]);

		console.debug("Loaded scenario", `${filename} (${scenario.info.name})`);

		return scenario;
	}

	/**
	 * Applies this scenario to the global state, such as files in the file system.
	 */
	apply() {
		// Set files in filesystem.
		fileSystem.files = [];
		for (const file of this.files) {
			// These are not set in the scenario file, because all scenario file entries are files,
			// never directories.
			file.isDir = false;
			// Make sure none of the file locations are prefixed with a forward slash by accident.
			if (file.location.startsWith("/")) {
				console.error(
					"File " +
						file.location +
						"/" +
						file.name +
						" in scenario " +
						this.info.name +
						" is prefixed with a /."
				);
				file.location = file.location.substring(1);
			}
			fileSystem.files.push(file);
		}

		// Set page title to name of this scenario.
		document.title = this.info.name + " - Let Me In!";
	}
}

/**
 * @type {{activeScenario:Scenario}}
 */
export const scenarioManager = reactive({
	activeScenario: null,
});

export function activateScenario(scenario) {
	scenario.apply();
	scenarioManager.activeScenario = scenario;
}

export function getAllScenarios() {
	return [
		{
			id: "000",
			name: "example.com",
		},
		{
			id: "001",
			name: "Credit Card",
		},
	];
}
