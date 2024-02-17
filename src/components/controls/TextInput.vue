<template>
  <div>
    <div class="-main">
      <!-- 
        Attributes that will (hopefully) stop the most common browser password manager
        extensions from hijacking the field.
        - data-lpignore is for Lastpass
        - data-np-autofill-field-type is for Nordpass
        - data-1p-ignore is for 1Pass
        - autocomplete="off" is for default browser autocomplete stuff
      -->
      <input
        :type="type || 'text'"
        class="-input"
        :value="value"
        :placeholder="placeholder"
        autocomplete="off"
        data-lpignore="true"
        data-np-autofill-field-type="goaway"
        data-1p-ignore="true"
        @input="this.$emit('input')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  components: {},
  props: {
    value: String,
    placeholder: String,
    type: String,
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
  display: inline-block;
  width: 100%;
}

.-input {
  margin: 0;
  border-width: 1px;
  border-style: solid;
  border-top-color: #808080;
  border-left-color: #808080;
  border-bottom-color: #dfdfdf;
  border-right-color: #dfdfdf;
  box-sizing: border-box;
  font-family: consolas, "Courier New", Courier, monospace;
  font-size: 11px;
  outline: none;
  width: 100%;
}
</style>
