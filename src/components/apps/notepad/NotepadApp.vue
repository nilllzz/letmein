<template>
  <base-window
    :id="`app-${this.appId}`"
    :titleTxt="this.getTitleText()"
    :titleIcon="this.getTitleIcon()"
    :position="this.getPosition()"
    :isActive="isActive"
    :style="{
      zIndex: this.zIndex,
    }"
    @mousedown="onMouseDown"
    @move="onMove"
  >
    <div class="-editor">
      <textarea class="-input" spellcheck="false" wrap="" ref="input" />
    </div>
  </base-window>
</template>

<script>
import BaseWindow from "@/components/window/BaseWindow.vue";
import BaseApp from "@/components/apps/BaseApp.vue";

export default {
  name: "NotepadApp",
  extends: BaseApp,
  components: {
    BaseWindow,
  },
  mounted() {
    let filename = "Untitled";
    if (this.srcFile && this.srcFile?.name !== "Notepad") {
      filename = this.srcFile.name;
    }

    this.updateTitle(filename + " - Notepad");
    this.updateIcon("icons/16/notepad");

    this.$refs.input.value = this.srcFile?.content || "";
    this.$refs.input.focus();
  },
};
</script>

<style scoped>
.-editor {
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-style: solid;
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
  box-sizing: border-box;
}

.-input {
  margin: 0;
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-style: solid;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
  box-sizing: border-box;
  resize: none;
  font-family: consolas, "Courier New", Courier, monospace;
  font-size: 11px;
  outline: none;
  overflow: scroll;
}
</style>
