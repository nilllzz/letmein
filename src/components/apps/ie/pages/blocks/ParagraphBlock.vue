<template>
  <div>
    <p>
      {{ this.data.text }}
    </p>
  </div>
</template>

<script>
export default {
  name: "ParagraphBlock",
  components: {},
  props: {
    data: Object,
  },
};
</script>

<style scoped>
</style>
