<template>
  <div class="-status-bar-main">
    <slot />
  </div>
</template>

<script>
export default {
  name: "StatusBar",
  components: {},
};
</script>

<style scoped>
.-status-bar-main {
  width: calc(100% - 2px);
  height: 18px;
  margin-top: 1px;
  margin-left: 1px;
  margin-right: 1px;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
  color: black;
  padding-left: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
  padding-right: 2px;
}
</style>
