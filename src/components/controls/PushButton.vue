<template>
  <div>
    <div
      class="-main"
      :class="{
        '-no-min-width': noMinWidth,
        '-active': isActive,
        '-sm': sm,
        '-disabled': disabled,
      }"
      :style="{
        width: `${width}px`,
      }"
    >
      <div
        class="-inner"
        :style="{
          'text-align': textAlign || 'left',
        }"
      >
        <img
          v-if="icon"
          draggable="false"
          class="-icon"
          :src="require(`@/assets/img/${icon}.png`)"
        />
        <span v-if="txt" class="-inner-text">{{ txt }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PushButton",
  components: {},
  props: {
    txt: String,
    noMinWidth: Boolean,
    icon: String,
    width: Number,
    textAlign: String,
    isActive: Boolean,
    sm: Boolean,
    disabled: Boolean,
  },
};
</script>

<style scoped>
.-main {
  color: black;
  border-width: 1px;
  border-style: solid;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-bottom-color: #000000;
  border-right-color: #000000;
  min-height: 10px;
  min-width: 78px;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  background-color: #c0c0c0;
}

.-disabled {
  color: #787c78;
  text-shadow: 1px 1px 1px #ffffff;
}

.-no-min-width {
  min-width: 10px;
}

.-main:active {
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
}

.-main.-disabled:active {
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-bottom-color: #000000;
  border-right-color: #000000;
}

.-active {
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
}

.-active .-inner {
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
  background: url("../../assets/img/misc/dotted.png");
  font-weight: bold;
}

.-inner {
  border-width: 1px;
  border-style: solid;
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-bottom-color: #808080;
  border-right-color: #808080;
  box-sizing: border-box;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
  user-select: none;
  font-family: "MS Sans Serif";
  font-size: 11px;
  min-height: 19px;
}

.-inner > * {
  vertical-align: middle;
}

.-inner-text {
  max-width: calc(100% - 18px);
  display: inline-block;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.-inner:active {
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
}

.-disabled .-inner:active {
  border-top-color: #dfdfdf;
  border-left-color: #dfdfdf;
  border-bottom-color: #808080;
  border-right-color: #808080;
}

.-icon {
  width: 16px;
  height: 16px;
  margin-right: 2px;
}

.-sm .-icon {
  width: 10px;
  height: 10px;
  margin-right: 0;
}

.-sm .-inner {
  padding-left: 1px;
  padding-right: 1px;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  min-height: 10px;
}
</style>
