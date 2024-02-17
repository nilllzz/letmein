<template>
  <bevel-container>
    <div class="-context-menu"><slot /></div>
  </bevel-container>
</template>

<script>
import BevelContainer from "../BevelContainer.vue";

export default {
  name: "ContextMenu",
  components: {
    BevelContainer,
  },
};
</script>

<style scoped>
.-context-menu {
  padding: 1px;
}
</style>
