<template>
  <div>
    <div class="captcha captcha-simple">
      <div class="captcha-simple-input">
        <check-box
          @input="onInput"
          :checked="this.value || false"
          :controlId="controlId + '-control'"
        />
        <label class="captcha-simple-label" :for="controlId + '-control'">
          I'm not a robot
        </label>
      </div>
      <div class="captcha-simple-icon">
        <img :src="require('@/assets/img/forms/captcha-check.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from "@/components/controls/CheckBox.vue";
import BaseControlVue from "./BaseControl.vue";

export default {
  name: "CaptchaSimpleControl",
  extends: BaseControlVue,
  components: {
    CheckBox,
  },
  methods: {
    onInput(e) {
      if (!e) {
        return;
      }

      const newValue = e.target.checked || false;
      this.updateValue(newValue);

      const isValid = newValue;
      this.updateIsValid(isValid);
    },
  },
};
</script>

<style scoped>
.captcha-simple {
  background-color: #c0c0c0;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 160px;
  color: black;
}

.captcha-simple-input {
  display: flex;
}

.captcha-simple-label {
  margin-left: 8px;
  cursor: url("@/assets/cursors/hand.cur"), default;
}

.captcha-simple-icon {
  margin-left: 12px;
}
</style>
