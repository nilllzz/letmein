<template>
  <div
    class="-main"
    ref="window"
    :style="{
      top: `${this.position?.y || 0}px`,
      left: `${this.position?.x || 0}px`,
      width: `${this.width || 620}px`,
      height: `${this.height || 430}px`,
    }"
  >
    <div class="-inner">
      <title-bar
        v-if="titleTxt || titleIcon"
        :txt="titleTxt"
        :icon="titleIcon"
        :isActive="isActive"
        :showHelp="showHelp || false"
        @move="onMove"
        @requestExit="this.$emit('requestExit')"
        @requestHelp="this.$emit('requestHelp')"
      />
      <div class="-client-area" :style="{ height: getClientAreaHeightCss() }">
        <slot />
      </div>
      <status-bar v-if="hasStatusBarEntries()">
        <slot name="statusBar" />
      </status-bar>
    </div>
  </div>
</template>

<script>
import StatusBar from "./StatusBar.vue";
import TitleBar from "./TitleBar.vue";

export default {
  name: "BaseWindow",
  components: {
    TitleBar,
    StatusBar,
  },
  emits: ["requestExit", "requestHelp", "move"],
  props: {
    titleTxt: String,
    titleIcon: String,
    isActive: Boolean,
    position: Object,
    width: Number,
    height: Number,
    showHelp: Boolean,
  },
  methods: {
    onMove(diff) {
      const x = Math.min(800, Math.max(0, this.position.x + diff.x));
      const y = Math.min(590, Math.max(0, this.position.y + diff.y));
      this.$emit("move", { x, y });
    },

    hasStatusBarEntries() {
      return !!this.$slots.statusBar;
    },

    getClientAreaHeightCss() {
      if (this.hasStatusBarEntries()) {
        return `calc(100% - 39px)`;
      } else {
        return `calc(100% - 19px)`;
      }
    },
  },
};
</script>

<style scoped>
.-main {
  border-width: 1px;
  border-style: solid;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-bottom-color: #000000;
  border-right-color: #000000;
  display: inline-block;
  position: absolute;
  box-sizing: border-box;
  background-color: #c0c0c0;

  /* width: 620px;
  height: 430px; */
}

.-inner {
  border-width: 1px;
  border-style: solid;
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-bottom-color: #808080;
  border-right-color: #808080;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1px;
}

.-client-area {
  position: relative;
  overflow: hidden;
  padding-left: 1px;
  padding-right: 1px;
  padding-bottom: 1px;
  padding-top: 2px;
  box-sizing: border-box;
}
</style>
