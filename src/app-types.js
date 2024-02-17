import CMDApp from "@/components/apps/cmd/CMDApp.vue";
import FilePropertiesApp from "@/components/apps/file-properties/FilePropertiesApp.vue";
import FilesApp from "@/components/apps/files/FilesApp.vue";
import IEApp from "@/components/apps/ie/IEApp.vue";
import NotepadApp from "@/components/apps/notepad/NotepadApp.vue";
import PaintApp from "@/components/apps/paint/PaintApp.vue";

/**
 * Returns the Vue component type from the app's name.
 * @param {string} appName
 */
export function getAppTypeFromName(appName) {
	appName = appName.toLowerCase();

	// All apps need to be registered here.
	switch (appName) {
		case "ie":
			return IEApp;
		case "notepad":
			return NotepadApp;
		case "files":
			return FilesApp;
		case "paint":
			return PaintApp;
		case "fileProperties":
			return FilePropertiesApp;
		case "cmd":
			return CMDApp;
	}
}
