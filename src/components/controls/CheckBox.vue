<template>
  <div>
    <div class="-main">
      <input
        :id="controlId"
        type="checkbox"
        class="-input"
        @input="this.$emit('input')"
        :checked="checked"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  components: {},
  props: {
    checked: Boolean,
    controlId: String,
  },
};
</script>

<style scoped>
.-main {
  width: 11px;
  height: 11px;
  cursor: url("@/assets/cursors/hand.cur"), pointer;
  background-color: white;

  border-width: 1px;
  border-style: solid;
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
}

.-input {
  display: block;
  appearance: none;
  border-width: 1px;
  border-style: solid;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
  width: 9px;
  height: 9px;
  margin: 0;
  box-sizing: content-box;
  cursor: url("@/assets/cursors/hand.cur"), default;
}

.-input:checked {
  background-image: url("@/assets/img/misc/check.png");
}
</style>
