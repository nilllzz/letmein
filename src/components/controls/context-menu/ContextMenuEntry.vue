<template>
  <div class="-context-menu-entry no-select" @click="onClick">
    <span class="-icon" :class="{ '-icon-lg': lg }">
      <img
        v-if="icon"
        draggable="false"
        :src="require(`@/assets/img/${icon}.png`)"
      />
    </span>
    <span class="-text" :class="{ '-text-bold': bold }">
      {{ text }}
    </span>
    <span class="-nav">
      <img
        v-if="hasSubEntries()"
        draggable="false"
        class="-nav-icon"
        :src="require(`@/assets/img/misc/arrow-right.png`)"
      />
      <div v-if="hasSubEntries()" class="-subnav">
        <context-menu ref="subContextMenu">
          <slot name="items" />
        </context-menu>
      </div>
    </span>
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu.vue";
export default {
  name: "ContextMenuEntry",
  components: {
    ContextMenu,
  },
  props: {
    text: String,
    icon: String,
    bold: Boolean,
    lg: Boolean,
  },
  methods: {
    hasSubEntries() {
      return !!this.$slots.items;
    },

    onClick(e) {
      // Only emit the activated event when there's either no sub context menu
      // or the click originated from within this entry (not the sub context menu).
      if (
        !this.$refs.subContextMenu ||
        // TOOD: e.path is not real, what is this?
        !e.path.includes(this.$refs.subContextMenu.$el)
      ) {
        this.$emit("activate");
      }
    },
  },
};
</script>

<style scoped>
.-context-menu-entry {
  padding: 1px;
  display: flex;
  align-items: center;
}

.-context-menu-entry > * {
  vertical-align: middle;
}

.-text {
  padding-top: 2px;
  padding-bottom: 2px;
  flex-grow: 1;
  white-space: nowrap;
}

.-text-bold {
  font-weight: bold;
}

.-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.-icon-lg {
  width: 32px;
  height: 32px;
}

.-nav {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 10px;
  position: relative;
}

.-nav > .-subnav {
  top: -7px;
  left: 15px;
  position: absolute;
  width: auto;
}

.-subnav {
  display: none;
}

.-context-menu-entry:hover > .-nav > .-subnav {
  display: block;
}

.-nav-icon {
  width: 16px;
  height: 16px;
}

.-context-menu-entry:hover > .-nav > .-nav-icon {
  filter: invert(1);
}

.-context-menu-entry:hover {
  background-color: #000181;
  color: white;
}
</style>
