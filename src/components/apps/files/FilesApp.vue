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
    <div class="-files-container">
      <div class="-files-inner" @click="onClickFileList">
        <div class="-files-header">
          <div class="-files-header-item -controls no-select">
            <nav-control-button
              text="Back"
              icon="arrow-left"
              :isDisabled="!canGoBack()"
              @click="onClickGoBack"
            />
            <nav-control-button
              text="Forward"
              icon="arrow-right"
              :isDisabled="!canGoForward()"
              @click="onClickGoForward"
            />
            <nav-control-button
              text="Up"
              icon="directory-up"
              :isDisabled="!canGoUp()"
              @click="onClickGoUp"
            />
          </div>
          <div class="-files-header-item -address-line">
            <span class="no-select">Address</span>
            <text-input
              class="-url"
              :value="this.url"
              @input="onInputUrl"
              @keydown="onInputKeydown"
            />
          </div>
        </div>
        <bevel-container inverse class="-files">
          <div class="-files-panes">
            <div v-if="getIsRoot()" class="-welcome-pane no-select">
              <div class="-welcome-pane-header">
                <img
                  :src="require(`@/assets/img/icons/32/files.png`)"
                  draggable="false"
                />
                <div>MY DOCUMENTS</div>
              </div>
              <div class="-welcome-pane-separator">
                <div class="-welcome-pane-separator-r" />
                <div class="-welcome-pane-separator-y" />
                <div class="-welcome-pane-separator-g" />
                <div class="-welcome-pane-separator-b" />
              </div>
              <div class="-welcome-pane-description">
                Double click an item to view its contents.
              </div>
              <div class="-welcome-pane-background">
                <img
                  draggable="false"
                  :src="
                    require(`@/assets/img/apps/files/welcome-pane-background.png`)
                  "
                />
              </div>
            </div>
            <div class="-files-list">
              <desktop-icon
                v-for="file of getCurrentFiles()"
                :key="file.location + '/' + file.name"
                :icon="file.icon"
                :txt="file.name"
                :isActive="file.name === activeIconName"
                @select="onSelectDesktopIcon(file.name)"
                @activate="onActivateDesktopIcon(file)"
                @click.stop
                @contextmenu="onRightClickFile(file)"
              />
              <context-menu-host
                v-if="showFileContextMenu"
                @dismiss="showFileContextMenu = false"
              >
                <context-menu-entry
                  text="Open"
                  bold
                  @activate="onClickFileContextMenuOpen"
                />
                <context-menu-entry
                  v-if="contextMenuFile.app === 'files'"
                  text="Open in new window"
                  @activate="onClickFileContextMenuOpenNewWindow"
                />

                <context-menu-divider />
                <context-menu-entry
                  text="Properties"
                  @activate="onClickFileContextMenuProperties"
                />
              </context-menu-host>
            </div>
          </div>
        </bevel-container>
      </div>
    </div>

    <template #statusBar>
      <span class="no-select"> {{ getCurrentFiles().length }} object(s) </span>
    </template>
  </base-window>
</template>

<script>
import BaseWindow from "@/components/window/BaseWindow.vue";
import BaseApp from "@/components/apps/BaseApp.vue";
import BevelContainer from "@/components/controls/BevelContainer.vue";
import { getFilesForLocation } from "@/file-system";
import DesktopIcon from "@/components/desktop/icon/DesktopIcon.vue";
import TextInput from "@/components/controls/TextInput.vue";
import NavControlButton from "./NavControlButton.vue";
import ContextMenuHost from "@/components/controls/context-menu/ContextMenuHost.vue";
import ContextMenuEntry from "@/components/controls/context-menu/ContextMenuEntry.vue";
import ContextMenuDivider from "@/components/controls/context-menu/ContextMenuDivider.vue";

export default {
  name: "FilesApp",
  extends: BaseApp,
  components: {
    BaseWindow,
    BevelContainer,
    DesktopIcon,
    TextInput,
    NavControlButton,
    ContextMenuHost,
    ContextMenuEntry,
    ContextMenuDivider,
  },
  data() {
    return {
      location: "",
      url: "/",
      activeIconName: "",
      navigationList: [],
      navigationListIndex: -1,
      showFileContextMenu: false,
      contextMenuFile: null,
    };
  },
  emits: ["openFile", "startApp"],
  methods: {
    navigate(to, resetNavList = true) {
      if (to.startsWith("/")) {
        to = to.substring(1);
      }

      if (resetNavList) {
        if (this.navigationList.length > 0) {
          this.navigationList = this.navigationList.slice(
            0,
            this.navigationListIndex + 1
          );
          this.navigationListIndex = this.navigationList.length - 1;
        }

        this.navigationListIndex++;
        this.navigationList.splice(this.navigationListIndex, 0, to);
      }

      this.activeIconName = "";
      this.location = to;

      let targetUrl = to;
      if (!targetUrl.startsWith("/")) {
        targetUrl = "/" + targetUrl;
      }
      this.url = targetUrl;

      if (this.location === "") {
        this.updateTitle("My Documents");
        this.updateIcon("icons/16/files");
      } else if (this.location === "Desktop") {
        this.updateTitle("Desktop");
        this.updateIcon("icons/16/desktop");
      } else {
        const locationParts = this.location.split("/");
        let title = locationParts[locationParts.length - 1];
        this.updateTitle(title);
        this.updateIcon("icons/16/folder");
      }
    },

    getIsRoot() {
      return this.location === "";
    },

    getCurrentFiles() {
      return this.getFilesForLocation(this.location);
    },

    getFilesForLocation(location) {
      return getFilesForLocation(location, { sort: true });
    },

    onSelectDesktopIcon(fileName) {
      this.activeIconName = fileName;
    },

    onActivateDesktopIcon(file) {
      this.openFile(file);
    },

    openFile(file) {
      if (file.app === "files") {
        this.navigate(file.location + "/" + file.name);
      } else {
        this.$emit("openFile", file);
      }
    },

    onClickFileList() {
      this.activeIconName = "";
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

      let targetLocation = this.url.trim();
      if (targetLocation.startsWith("/")) {
        targetLocation = targetLocation.substring(1);
      }

      if (this.getFilesForLocation(targetLocation).length === 0) {
        // TODO: show error message that target location cannot be found.
        targetLocation = "";
      }

      this.navigate(targetLocation);
    },

    canGoUp() {
      return !this.getIsRoot();
    },

    onClickGoUp() {
      if (!this.canGoUp()) {
        return;
      }

      let targetLocation = "";
      const locationParts = this.location.split("/");
      locationParts.pop();
      targetLocation = locationParts.join("/");
      this.navigate(targetLocation);
    },

    canGoBack() {
      return this.navigationList.length > 0 && this.navigationListIndex > 0;
    },

    onClickGoBack() {
      if (!this.canGoBack()) {
        return;
      }
      this.navigationListIndex--;
      this.navigate(this.navigationList[this.navigationListIndex], false);
    },

    canGoForward() {
      return (
        this.navigationList.length > 0 &&
        this.navigationListIndex < this.navigationList.length - 1
      );
    },

    onClickGoForward() {
      if (!this.canGoForward()) {
        return;
      }
      this.navigationListIndex++;
      this.navigate(this.navigationList[this.navigationListIndex], false);
    },

    onRightClickFile(file) {
      this.contextMenuFile = file;
      this.showFileContextMenu = true;
    },

    onClickFileContextMenuOpen() {
      this.openFile(this.contextMenuFile);
    },

    onClickFileContextMenuOpenNewWindow() {
      this.$emit("openFile", this.contextMenuFile);
    },

    onClickFileContextMenuProperties() {
      this.$emit("startApp", "fileProperties", this.contextMenuFile);
    },
  },
  mounted() {
    this.updateTitle("My Documents");
    this.updateIcon("icons/16/files");

    if (!this.srcFile || !this.srcFile.isDir) {
      this.navigationList.push("");
      this.navigationListIndex = 0;
    } else {
      this.navigate(this.srcFile.location + "/" + this.srcFile.name);
    }
  },
};
</script>

<style scoped>
.-files-container {
  width: 100%;
  height: 100%;
}

.-files-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.-files-header {
  border-width: 1px;
  border-style: solid;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
  margin-bottom: 3px;
  color: black;
}

.-files-header-item {
  border-width: 1px;
  border-style: solid;
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-bottom-color: #808080;
  border-right-color: #808080;
}

.-controls {
  display: flex;
  padding: 2px;
}

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
  margin-right: 6px;
}

.-files {
  background-color: white;
  flex-grow: 1;
  /* Depends on the size of the box above. */
  max-height: calc(100% - 76px);
}

.-files-panes {
  display: flex;
  height: 100%;
}

.-welcome-pane {
  width: 148px;
  position: relative;
}

.-welcome-pane > * {
  z-index: 2;
  position: relative;
}

.-welcome-pane-background {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.-welcome-pane-header {
  padding: 14px;
}

.-welcome-pane-header > img {
  margin-bottom: 10px;
}

.-welcome-pane-header > div {
  font-size: 20px;
  font-weight: bold;
}

.-welcome-pane-separator {
  display: flex;
}

.-welcome-pane-separator > div {
  width: 32px;
  height: 1px;
}

.-welcome-pane-separator-r {
  background-color: #ff3300;
}

.-welcome-pane-separator-y {
  background-color: #ffcc00;
}

.-welcome-pane-separator-g {
  background-color: #66cc33;
}

.-welcome-pane-separator-b {
  background-color: #0099ff;
}

.-welcome-pane-description {
  padding: 14px;
}

.-files-list {
  display: flex;
  padding: 2px;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100% - 4px);
  overflow-y: scroll;
}
</style>
