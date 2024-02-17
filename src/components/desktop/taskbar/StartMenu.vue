<template>
  <context-menu-host
    v-if="isVisible"
    :position="{ x: 0, y: 414 }"
    @dismiss="onDismiss"
  >
    <template #before>
      <div class="-start-menu-left">
        <img
          class="-start-menu-logo"
          draggable="false"
          :src="require('@/assets/img/misc/start-menu-logo.png')"
        />
      </div>
    </template>
    <context-menu-entry
      text="Windows Update"
      lg
      icon="icons/32/windows-update"
    />
    <context-menu-divider />
    <context-menu-entry
      icon="icons/24/dir-programs"
      text="Programs"
      lg
      @activate="onClickHelloWorld"
    >
      <template #items>
        <context-menu-entry text="Accessories" icon="icons/16/dir-programs">
          <template #items>
            <context-menu-entry
              text="Notepad"
              icon="icons/16/notepad"
              @activate="startApp('notepad')"
            />
            <context-menu-entry
              text="Paint"
              icon="icons/16/paint"
              @activate="startApp('paint')"
            />
          </template>
        </context-menu-entry>
        <context-menu-entry
          text="Command Prompt"
          icon="icons/16/cmd"
          @activate="startApp('cmd')"
        />
        <context-menu-entry
          text="Internet Explorer"
          icon="icons/16/ie"
          @activate="startApp('ie')"
        />
        <context-menu-entry text="Outlook Express" icon="icons/16/outlook" />
      </template>
    </context-menu-entry>
    <context-menu-entry
      text="My Documents"
      lg
      icon="icons/24/files"
      @activate="startApp('files')"
    />
    <context-menu-divider />
    <context-menu-entry text="Help" lg icon="icons/24/help-book" />
    <context-menu-divider />
    <context-menu-entry text="Shut Down..." lg icon="icons/24/shutdown" />
  </context-menu-host>
</template>

<script>
import ContextMenuHost from "@/components/controls/context-menu/ContextMenuHost.vue";
import ContextMenuEntry from "@/components/controls/context-menu/ContextMenuEntry.vue";
import ContextMenuDivider from "@/components/controls/context-menu/ContextMenuDivider.vue";
export default {
  name: "StartMenu",
  components: {
    ContextMenuHost,
    ContextMenuEntry,
    ContextMenuDivider,
  },
  props: {
    isVisible: Boolean,
  },
  emits: ["startApp"],
  methods: {
    onDismiss() {
      this.$emit("dismiss");
    },

    onClickHelloWorld() {
      console.log("PRESSED");
    },

    startApp(appName) {
      this.$emit("startApp", appName);
    },
  },
};
</script>

<style scoped>
.-start-menu-left {
  background-color: #00007b;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.-start-menu-logo {
  display: block;
}
</style>
