<template>
  <div
    ref="container"
    class="-context-menu-container"
    id="context-menu-container"
    @click="onClickContainer"
  ></div>
</template>

<script>
import { EventBus } from "./context-menu-event-bus";
export default {
  name: "ContextMenuContainer",
  components: {},
  methods: {
    onChildrenUpdated() {
      const childLength = this.$refs.container.children.length;
      if (childLength > 0) {
        this.$refs.container.className =
          "-context-menu-container -context-menu-container-active";
      } else {
        this.$refs.container.className = "-context-menu-container";
      }
    },

    onClickContainer() {
      EventBus.invoke("dismiss");
    },
  },
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = new MutationObserver(() => this.onChildrenUpdated());
    this.observer.observe(this.$refs.container, {
      childList: true,
      attributes: false,
      characterData: false,
    });
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};

export const CONTEXT_MENU_CONTAINER_ID = "context-menu-container";
</script>

<style scoped>
.-context-menu-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: none;
}

.-context-menu-container-active {
  display: block;
}
</style>
