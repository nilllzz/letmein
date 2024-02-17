<template>
  <div />
</template>

<script>
export default {
  name: "BaseApp",
  components: {},
  emits: ["activate", "appMove", "appUpdate"],
  props: {
    appId: Number,
    srcFile: Object,
    isActive: Boolean,
    zIndex: Number,
    data: Object,
  },
  methods: {
    onMouseDown() {
      this.$emit("activate", this.appId);
    },

    onMove(position) {
      this.$emit("appMove", this.appId, position);
    },

    getTitleText() {
      return this.data.title;
    },

    getTitleIcon() {
      return this.data.icon;
    },

    getPosition() {
      return this.data.position;
    },

    updateTitle(title) {
      this.$emit("appUpdate", this.appId, title, this.getTitleIcon());
    },

    updateIcon(icon) {
      this.$emit("appUpdate", this.appId, this.getTitleText(), icon);
    },
  },
};
</script>

<style scoped>
</style>
