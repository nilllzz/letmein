<template>
  <div
    class="-control-button"
    :class="{
      '-control-button-disabled': isDisabled,
      '-control-button-enabled': !isDisabled,
    }"
  >
    <div class="-control-button-inner">
      <img
        draggable="false"
        :src="
          require(`@/assets/img/apps/files/${icon}${
            isDisabled ? '-disabled' : ''
          }.png`)
        "
      />
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "NavControlButton",
  components: {},
  props: {
    text: String,
    icon: String,
    isDisabled: Boolean,
  },
};
</script>

<style scoped>
.-control-button {
  width: 56px;
  cursor: url("@/assets/cursors/hand.cur"), pointer;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
}

.-control-button-disabled {
  cursor: url("@/assets/cursors/default.cur"), default;
}

.-control-button-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
}

.-control-button > img {
  display: block;
  width: 24px;
  height: 24px;
}

.-control-button-enabled:hover {
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-bottom-color: #000000;
  border-right-color: #000000;
}

.-control-button-enabled:hover > .-control-button-inner {
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-bottom-color: #808080;
  border-right-color: #808080;
}

.-control-button-enabled:active {
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
}

.-control-button-enabled:active > .-control-button-inner {
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
}
</style>
