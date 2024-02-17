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
    <div class="-address-line">
      <span class="no-select">Address</span>
      <text-input
        class="-url"
        :value="this.url"
        @input="onInputUrl"
        @keydown="onInputKeydown"
      />
    </div>
    <div ref="page" class="-page-container">
      <div class="-page-container-inner">
        <component v-if="currentPage" :is="currentPage" />
      </div>
    </div>
  </base-window>
</template>

<script>
import BaseWindow from "@/components/window/BaseWindow.vue";
import BaseApp from "@/components/apps/BaseApp.vue";
import TextInput from "@/components/controls/TextInput.vue";
import BlankPage from "./pages/BlankPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import CustomPage from "./pages/CustomPage.vue";
import { createVNode } from "@vue/runtime-core";
import Website from "@/websites/website";

export default {
  name: "IEApp",
  extends: BaseApp,
  components: {
    BaseWindow,
    TextInput,
  },
  data() {
    return {
      url: "about:blank",
      pageTitle: "about:blank",
      currentPage: null,
    };
  },
  methods: {
    getPageForUrl(url) {
      if (!url.startsWith("about:")) {
        const page = Website.tryLoad(url);
        if (page) {
          const title = page.title || "Untitled";
          this.updateTitle(title + " - Internet Explorer");
          return createVNode(CustomPage, { page });
        }
      }

      // Special pages.
      switch (url.toLowerCase()) {
        case "about:blank":
          this.updateTitle("about:blank - Internet Explorer");
          return createVNode(BlankPage);
        default:
          this.updateTitle("Not Found - Internet Explorer");
          return createVNode(NotFoundPage);
      }
    },

    navigate() {
      if (!this.url.startsWith("about:")) {
        if (
          !this.url.startsWith("http://") &&
          !this.url.startsWith("https://")
        ) {
          this.url = "http://" + this.url;
        }
      }

      this.currentPage = this.getPageForUrl(this.url);
    },

    onInputUrl(e) {
      if (!e) {
        return;
      }
      this.url = e.target.value;
    },

    onInputKeydown(e) {
      if (!e) {
        return;
      }
      if (e.code !== "Enter") {
        return;
      }

      this.navigate();
    },
  },
  mounted() {
    if (this.srcFile?.content) {
      this.url = this.srcFile.content;
      this.pageTitle = this.srcFile.content;
    }

    this.updateTitle(this.pageTitle + " - Internet Explorer");
    this.updateIcon("icons/16/ie");

    this.navigate();
  },
};

export function getIcon() {
  return {
    text: "Internet Explorer",
    icon: "icons/16/ie",
  };
}
</script>

<style scoped>
.-address-line {
  color: black;
  display: flex;
  width: 100%;
  padding: 2px;
  box-sizing: border-box;
  align-items: center;
}

.-url {
  margin-left: 6px;
  width: 100%;
}

.-page-container {
  border-width: 1px;
  border-style: solid;
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
  background-color: #ffffff;
  height: calc(100% - 23px);
  box-sizing: border-box;
}

.-page-container-inner {
  border-width: 1px;
  border-style: solid;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
  height: 100%;
  box-sizing: border-box;
  color: black;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
  overflow: scroll;
  position: relative;
}
</style>
