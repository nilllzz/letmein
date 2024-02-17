<template>
  <text-input
    :placeholder="placeholder"
    :id="controlId"
    @input="onInput"
    :value="this.value"
  />
</template>

<script>
import TextInput from "@/components/controls/TextInput.vue";
import BaseControlVue from "./BaseControl.vue";

export default {
  name: "EmailAddressControl",
  extends: BaseControlVue,
  components: {
    TextInput,
  },
  methods: {
    onInput(e) {
      if (!e) {
        return;
      }
      this.$emit("valueChange", this.controlId, e.target.value);
    },
  },
};
</script>

<style scoped>
</style>
