<template>
  <div class="-background">
    <context-menu-container />

    <div class="-desktop" @click="onClickDesktop">
      <div class="-icons" id="desktop-icons">
        <desktop-icon
          v-for="icon in icons"
          :key="icon.icon.icon"
          :icon="icon.icon.icon"
          :txt="icon.icon.text"
          :isActive="icon.id === activeIconId"
          @activate="icon.click()"
          @select="onSelectDesktopIcon(icon.id)"
        />
      </div>

      <component
        v-for="app in apps"
        :key="app.id"
        :is="app.component"
        :data="app.data"
        :isActive="app.id === this.activeAppId"
        :zIndex="getAppZIndex(app.id)"
        @activate="onAppActivate"
        @appMove="onAppMove"
        @appUpdate="onAppUpdate"
        @requestExit="onAppRequestExit(app.id)"
        @openFile="onAppOpenFile"
        @startApp="onAppStartApp"
      />
    </div>

    <task-bar class="-taskbar" :time="time" @startApp="onTaskbarStartApp">
      <push-button
        v-for="app in apps"
        :key="app.id"
        class="-taskbar-app-btn"
        :txt="app.data.title"
        :icon="app.data.icon"
        :width="160"
        :isActive="app.id === this.activeAppId"
        @click="onClickTaskbarAppBtn(app.id)"
      />
    </task-bar>
  </div>
</template>

<script>
import TaskBar from "@/components/desktop/taskbar/TaskBar.vue";
import PushButton from "@/components/controls/PushButton.vue";
import DesktopIcon from "@/components/desktop/icon/DesktopIcon.vue";
import { store } from "@/views/desktop/desktop-store";
import { createVNode } from "@vue/runtime-core";
import { getDesktopFiles } from "@/file-system";
import ContextMenuContainer from "@/components/controls/context-menu/ContextMenuContainer.vue";
import { getAppTypeFromName } from "@/app-types";

export default {
  name: "DesktopView",
  components: {
    TaskBar,
    PushButton,
    DesktopIcon,
    ContextMenuContainer,
  },
  data() {
    return {
      store,
      currentAppId: 0,
      activeAppId: -1,
      appIdStack: [],
      activeIconId: "",
      apps: [],
      icons: [],
      time: 0,
    };
  },
  methods: {
    onAppActivate(appId) {
      // Put activated app id at the top of the stack.
      const newStack = this.appIdStack.filter((x) => x !== appId);
      newStack.unshift(appId);
      this.appIdStack = newStack;

      // Set active app id.
      this.activeAppId = appId;

      // Unfocus any active desktop icon.
      this.activeIconId = "";
    },

    onAppMove(appId, position) {
      for (const app of this.apps) {
        if (app.id === appId) {
          app.data.position = position;
        }
      }
    },

    onAppUpdate(appId, title, icon) {
      for (const app of this.apps) {
        if (app.id === appId) {
          app.data.title = title;
          app.data.icon = icon;
        }
      }
    },

    onAppRequestExit(appId) {
      // Remove from apps.
      this.apps = this.apps.filter((x) => x.id !== appId);
      // Remove from stack.
      this.appIdStack = this.appIdStack.filter((x) => x !== appId);
      // If it was the active app, deactivate it.
      if (this.activeAppId === appId) {
        this.activeAppId = -1; // TODO: set to top of stack if it has items?
      }
    },

    onClickDesktop(e) {
      if (e.target.id !== "desktop-icons") {
        return;
      }
      this.activeAppId = -1;
    },

    addApp(type, file) {
      this.currentAppId++;

      // Stack apps and generate positions in stacking order.
      const initialPos = (this.currentAppId % 4) * 30 + 20;
      const position = { x: initialPos, y: initialPos };

      const newApp = createVNode(type, {
        appId: this.currentAppId,
        srcFile: file,
      });
      this.apps.push({
        id: this.currentAppId,
        component: newApp,
        data: {
          title: "",
          icon: "icons/16/exe",
          position,
        },
      });

      // Activate newly added app.
      this.onAppActivate(this.currentAppId);
    },

    onClickTaskbarAppBtn(appId) {
      this.onAppActivate(appId);
    },

    onSelectDesktopIcon(iconId) {
      this.activeIconId = iconId;
    },

    onTaskbarStartApp(appName) {
      const appType = getAppTypeFromName(appName);
      this.addApp(appType, null);
    },

    onAppOpenFile(file) {
      const appType = getAppForFile(file);
      this.addApp(appType, file);
    },

    onAppStartApp(appName, file) {
      const appType = getAppTypeFromName(appName);
      this.addApp(appType, file);
    },

    getAppZIndex(appId) {
      const index = this.appIdStack.indexOf(appId);
      return this.appIdStack.length - index;
    },
  },
  mounted() {
    // Generate desktop icons from filesystem desktop entries.
    const desktopFiles = getDesktopFiles();
    for (const file of desktopFiles) {
      this.icons.push({
        id: file.location + "-" + file.name,
        icon: { text: file.name, icon: file.icon },
        click: () => {
          const appType = getAppForFile(file);
          this.addApp(appType, file);
        },
      });
    }

    // Set to start updating timer.
    setInterval(() => {
      this.time++;
    }, 1000);
  },
};

function getAppForFile(file) {
  return getAppTypeFromName(file.app);
}
</script>

<style scoped>
.-background {
  background-color: #008080;
  width: 100%;
  height: 100%;

  position: relative;
}

.-menu-container {
  position: absolute;
}

.-apps {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.-taskbar {
  z-index: 250;
}

.-taskbar-app-btn {
  margin-right: 2px;
}

.-desktop {
  width: 100%;
  height: 100%;
}

.-icons {
  padding-top: 2px;
  padding-left: 2px;
  padding-right: 2px;
  padding-bottom: 32px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
}

.-start-menu {
  position: absolute;
  left: 0;
  bottom: 28px;
}
</style>
