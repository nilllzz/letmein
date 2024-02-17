<template>
  <div />
</template>

<script>
export default {
  name: "BaseControl",
  components: {},
  props: {
    controlId: String,
    type: String,
    label: String,
    required: Boolean,
    data: Object,
    value: [String, Number, Boolean],
    placeholder: String,
  },
  methods: {
    updateValue(newValue) {
      this.$emit("valueChange", this.controlId, newValue);
    },
    updateIsValid(isValid) {
      this.$emit("isValidChange", this.controlId, isValid);
    },
  },
};
</script>

<style scoped>
</style>
