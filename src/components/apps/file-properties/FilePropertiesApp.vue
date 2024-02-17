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
    :width="386"
    :height="460"
    @mousedown="onMouseDown"
    @move="onMove"
  >
    <div class="-main-container">
      <tabbed-container
        :tabs="['General', 'Screen']"
        :selected-index="this.mainTabIndex"
      >
        <div class="-tab-content">
          Yo this is a tab contentaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
      </tabbed-container>
    </div>
  </base-window>
</template>

<script>
import BaseWindow from "@/components/window/BaseWindow.vue";
import BaseApp from "@/components/apps/BaseApp.vue";
import TabbedContainer from "@/components/controls/TabbedContainer.vue";

export default {
  name: "FilePropertiesApp",
  extends: BaseApp,
  components: {
    BaseWindow,
    TabbedContainer,
  },
  data() {
    return {
      mainTabIndex: 0,
    };
  },
  mounted() {
    // let filename = "Untitled";
    // if (this.srcFile && this.srcFile?.name !== "Notepad") {
    //   filename = this.srcFile.name;
    // }

    this.updateTitle(((this.srcFile?.name ?? "") + " Properties").trim());
    this.updateIcon(null);

    // this.$refs.input.value = this.srcFile?.content || "";
    // this.$refs.input.focus();
  },
};
</script>

<style scoped>
.-main-container {
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 10px;
  padding-bottom: 8px;
  height: calc(100% - 18px);
}

.-tab-content {
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
