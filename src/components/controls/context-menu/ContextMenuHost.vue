<template>
  <div>
    <teleport :to="getTeleportTarget()">
      <bevel-container
        ref="container"
        class="-context-menu-main"
        :style="{ top: `${this.positionY}px`, left: `${this.positionX}px` }"
      >
        <slot name="before" />
        <div class="-context-menu"><slot /></div>
      </bevel-container>
    </teleport>
  </div>
</template>

<script>
import BevelContainer from "../BevelContainer.vue";
import { CONTEXT_MENU_CONTAINER_ID } from "./ContextMenuContainer.vue";
import { EventBus } from "./context-menu-event-bus";
import { mousePosition } from "@/main";

export default {
  name: "ContextMenuHost",
  components: {
    BevelContainer,
  },
  props: {
    position: Object,
  },
  methods: {
    getTeleportTarget() {
      return "#" + CONTEXT_MENU_CONTAINER_ID;
    },
  },
  data() {
    return {
      doShow: false,
      eventBusId: "",
      positionX: 0,
      positionY: 0,
    };
  },
  emits: ["dismiss"],
  async mounted() {
    // Generate random id, and register with the event bus.
    this.eventBusId = Math.random().toString();
    // When the "dismiss" event is invoked, emit "dismiss" to the parent to remove this menu.
    EventBus.sub("dismiss", this.eventBusId, () => {
      this.$emit("dismiss");
    });

    if (this.position && Object.hasOwnProperty.call(this.position, "x")) {
      this.positionX = this.position.x;
    } else {
      this.positionX = mousePosition.x;
    }
    if (this.position && Object.hasOwnProperty.call(this.position, "y")) {
      this.positionY = this.position.y;
    } else {
      this.positionY = mousePosition.y;
    }

    // Wait for the component to build.
    await this.$nextTick();
    // If the menu is off the screen, move it up.
    const height = this.$refs.container.$el.offsetHeight;
    if (height + this.positionY > 640) {
      this.positionY = 640 - height;
    }
  },
  unmounted() {
    EventBus.unsub("dismiss", this.eventBusId);
  },
};
</script>

<style scoped>
.-context-menu {
  padding: 1px;
}

.-context-menu-main {
  position: absolute;
}

.-context-menu-main :deep(.-bevel-container-inner) {
  display: flex;
}
</style>
