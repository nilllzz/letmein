<template>
  <div class="-bevel-container" :class="{ '-inverse': inverse }">
    <div class="-bevel-container-inner" :class="{ '-inverse': inverse }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "BevelContainer",
  components: {},
  props: {
    inverse: Boolean,
  },
};
</script>

<style scoped>
.-bevel-container {
  border-width: 1px;
  border-style: solid;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-bottom-color: #000000;
  border-right-color: #000000;
  background-color: #c0c0c0;
  box-sizing: border-box;
  color: black;
  display: inline-block;
}

.-bevel-container.-inverse {
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
}

.-bevel-container-inner {
  border-width: 1px;
  border-style: solid;
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-bottom-color: #808080;
  border-right-color: #808080;
  box-sizing: border-box;
  height: 100%;
}

.-bevel-container-inner.-inverse {
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
}
</style>
