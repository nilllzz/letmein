<template>
  <div>
    <img
      class="page-block-image"
      :src="require(`@/assets/img/pages/${this.data.src}`)"
    />
  </div>
</template>

<script>
export default {
  name: "ImageBlock",
  components: {},
  props: {
    data: Object,
  },
};
</script>

<style scoped>
</style>
