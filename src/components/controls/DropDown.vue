<template>
  <div>
    <div class="-main">
      <select class="-select" @change="this.$emit('input')">
        <option
          v-for="option of options"
          :key="option.id"
          :value="option.id"
          :selected="value === option.id"
        >
          {{ option.text || option.id }}
        </option>
      </select>
      <push-button class="-dropdown-btn" noMinWidth sm icon="misc/arrow-down" />
    </div>
  </div>
</template>

<script>
import PushButton from "@/components/controls/PushButton.vue";

export default {
  name: "DropDown",
  components: {
    PushButton,
  },
  props: {
    options: Array,
    value: [Number, String],
  },
};
</script>

<style scoped>
.-main {
  border-width: 1px;
  border-style: solid;
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
  position: relative;
}

.-select {
  appearance: none;
  width: 100%;

  border-width: 1px;
  border-style: solid;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;

  font-size: 12px;
  color: black;
  padding: 1px;
}

.-dropdown-btn {
  position: absolute;
  right: 1px;
  top: 2px;
  pointer-events: none;
}
</style>
