import { createVNode, reactive } from "vue";

export const viewManager = reactive({
	activeView: null,
});

export function setView(viewType) {
	viewManager.activeView = createVNode(viewType);
	console.debug("Set view to:", viewType.name);
}
