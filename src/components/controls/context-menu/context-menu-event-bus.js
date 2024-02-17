class ContextMenuEventBus {
	closures = {
		dismiss: {},
	};

	sub(event, id, closure) {
		this.closures[event][id] = closure;
	}

	unsub(event, id) {
		this.closures[event][id] = null;
	}

	invoke(event, data = []) {
		for (const key in this.closures[event]) {
			if (Object.hasOwnProperty.call(this.closures[event], key)) {
				const closure = this.closures[event][key];
				if (closure !== null) {
					closure(...data);
				}
			}
		}
	}
}

export const EventBus = new ContextMenuEventBus();
