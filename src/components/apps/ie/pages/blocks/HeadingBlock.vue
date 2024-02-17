<template>
  <div>
    <component :is="getHeadingElementTag()">
      {{ data.text }}
    </component>
  </div>
</template>

<script>
export default {
  name: "HeadingBlock",
  components: {},
  props: {
    data: Object,
  },
  methods: {
    getHeadingElementTag() {
      const level = this.data.level || 1;
      if (typeof level !== "number") {
        return "h1";
      }
      if (level < 1) {
        return "h1";
      }
      if (level > 6) {
        return "h6";
      }

      return "h" + level;
    },
  },
};
</script>

<style scoped>
</style>
