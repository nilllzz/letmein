<template>
  <div>
    <div
      class="-main"
      :class="{
        '-main-active': isActive,
      }"
      draggable="true"
      @dragend="onDragEnd"
      @dragstart="onDragStart"
    >
      <div class="-left">
        <img
          v-if="icon"
          draggable="false"
          class="-icon"
          :src="require(`@/assets/img/${icon}.png`)"
          @dblclick="this.$emit('requestExit')"
        />
        <span class="-title-text">{{ txt }}</span>
      </div>
      <div class="-controls" @dragstart.stop @dragend.stop>
        <push-button
          v-if="showHelp"
          class="-help-btn"
          icon="misc/win-help"
          noMinWidth
          sm
          @click="this.$emit('requestHelp')"
        />
        <push-button
          icon="misc/win-x"
          noMinWidth
          sm
          @click="this.$emit('requestExit')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "@/views/desktop/desktop-store";
import PushButton from "@/components/controls/PushButton.vue";

export default {
  name: "TitleBar",
  components: {
    PushButton,
  },
  props: {
    txt: String,
    icon: String,
    isActive: Boolean,
    showHelp: Boolean,
  },
  methods: {
    onDragStart(e) {
      startX = e.clientX;
      startY = e.clientY;
    },
    onDragEnd(e) {
      this.$emit("move", { x: e.clientX - startX, y: e.clientY - startY });
      store.dragWindow = null;
    },
  },
};

let startX = 0;
let startY = 0;
</script>

<style scoped>
.-main {
  height: 18px;
  background: linear-gradient(to right, #808080, #b5b5b5);
  color: #c0c0c0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-left: 1px;
  margin-right: 1px;
  margin-top: 1px;
}

.-main-active {
  background: linear-gradient(to right, #000181, #1084d0);
  color: #ffffff;
}

.-left {
  padding-top: 1px;
  padding-left: 2px;
  padding-bottom: 1px;
  padding-right: 2px;
}

.-left > * {
  vertical-align: middle;
}

.-title-text {
  font-weight: bold;
  font-size: 11px;
}

.-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.-controls {
  padding-top: 2px;
  padding-right: 2px;
  display: flex;
}

.-help-btn {
  margin-right: 2px;
}
</style>
