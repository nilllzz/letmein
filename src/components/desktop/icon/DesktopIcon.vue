<template>
  <div>
    <div
      class="-main no-select"
      :class="{
        '-active': isActive,
      }"
      @dblclick="this.$emit('activate')"
      @mousedown="this.$emit('select')"
    >
      <img
        v-if="icon"
        draggable="false"
        class="-icon"
        :src="require(`@/assets/img/icons/32/${icon}.png`)"
      />
      <span class="-text">{{ txt }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DesktopIcon",
  components: {},
  props: {
    icon: String,
    txt: String,
    isActive: Boolean,
  },
};
</script>

<style scoped>
.-main {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 4px;
  margin-right: 8px;
  width: 72px;
  height: 72px;
}

.-icon {
  width: 32px;
  height: 32px;

  margin-bottom: 6px;
}

.-text {
  text-align: center;
}

.-active .-icon {
  border-style: dotted;
  border-color: #000000;
  border-width: 1px;
  margin-top: -1px;
}

.-active .-text {
  border-style: dotted;
  border-color: #000000;
  border-width: 1px;
  margin-top: -2px;
}
</style>
