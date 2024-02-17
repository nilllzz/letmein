<template>
  <div class="-main">
    <div class="-border-up -border-up-1" />
    <div class="-border-up -border-up-2" />
    <div class="-controls">
      <div class="-left">
        <push-button
          txt="Start"
          noMinWidth
          icon="icons/16/start"
          :isActive="startMenuOpen"
          @click="onClickStart"
        />
        <start-menu
          :is-visible="startMenuOpen"
          @dismiss="onDismissStartMenu"
          @startApp="startApp"
        />
        <task-bar-divider />
      </div>
      <div class="-center">
        <slot />
      </div>
      <div class="-right">
        <task-bar-divider />
        <div class="-tray">
          <img
            class="-tray-icon"
            draggable="false"
            :src="require(`@/assets/img/icons/16/outlook.png`)"
          />
          {{ getTimeDisplay() }}
        </div>
      </div>
    </div>
    <notification-bubble
      :x="692"
      :y="-72"
      icon="icons/16/info"
      header="Outlook Express"
      body="You've got mail!"
    />
  </div>
</template>

<script>
import PushButton from "@/components/controls/PushButton.vue";
import TaskBarDivider from "./TaskBarDivider.vue";
import NotificationBubble from "../notification/NotificationBubble.vue";
import StartMenu from "./StartMenu.vue";

export default {
  name: "TaskBar",
  components: {
    PushButton,
    TaskBarDivider,
    NotificationBubble,
    StartMenu,
  },
  props: {
    time: Number,
  },
  emits: ["startApp", "startMenuOpen"],
  data() {
    return {
      startMenuOpen: false,
    };
  },
  methods: {
    getTimeDisplay() {
      if (this.time > 5999) {
        return "99:59";
      }

      const minutes = Math.floor(this.time / 60).toString();
      const seconds = (this.time % 60).toString();

      return minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
    },

    onClickStart() {
      this.startMenuOpen = true;
      this.$emit("startMenuOpen");
    },

    onDismissStartMenu() {
      this.startMenuOpen = false;
    },

    startApp(appName) {
      this.$emit("startApp", appName);
    },
  },
};
</script>

<style scoped>
.-main {
  position: absolute;
  bottom: 0;

  background-color: #c0c0c0;
  width: 100%;
  height: 28px;
}

.-border-up {
  width: 100%;
  height: 1px;
}

.-border-up-1 {
  background-color: #dfdfdf;
}

.-border-up-2 {
  background-color: #ffffff;
}

.-controls {
  padding: 2px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.-left {
  display: flex;
  box-sizing: border-box;
  flex-shrink: 0;
}

.-center {
  flex-grow: 1;
  max-width: 720px;
  display: flex;
  overflow: hidden;
}

.-right {
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
}

.-tray {
  display: flex;
  box-sizing: border-box;
  color: black;
  font-size: 10px;
  align-items: center;
  padding-right: 4px;
  padding-left: 4px;
  position: relative;

  border-width: 1px;
  border-style: solid;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
  margin-bottom: 2px;
}

.-tray-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
