<template>
  <div class="form">
    <fieldset
      v-for="fieldset of this.form.fieldsets"
      :key="fieldset.id"
      class="form-fieldset"
    >
      <legend v-if="fieldset.label" class="fieldset-legend">
        {{ fieldset.label }}
      </legend>
      <div
        v-for="control of fieldset.controls"
        :key="control.id"
        class="control-group"
      >
        <label :for="`${fieldset.id}-${control.id}`" class="control-label">
          {{ control.label }}
        </label>
        <div class="controls">
          <component
            :is="getControlFromType(control.type)"
            :controlId="`${fieldset.id}-${control.id}`"
            :type="control.type"
            :label="control.label"
            :required="control.required || false"
            :data="control.data || {}"
            :placeholder="control.placeholder || undefined"
            :value="formValues[`${fieldset.id}-${control.id}`]"
            @valueChange="onFormControlValueChanged"
            @isValidChange="onFormControlIsValidChanged"
          />
        </div>
      </div>
    </fieldset>
    <push-button txt="Submit" textAlign="center" :disabled="!canSubmit" />
  </div>
</template>

<script>
import PushButton from "@/components/controls/PushButton.vue";
import EmailAddressControlVue from "../form/controls/EmailAddressControl.vue";
import CaptchaSimpleControlVue from "../form/controls/CaptchaSimpleControl.vue";

export default {
  name: "PageForm",
  components: {
    PushButton,
  },
  props: {
    form: Object,
  },
  data() {
    return {
      formValues: {},
      formIsValid: {},
      canSubmit: false,
    };
  },
  methods: {
    getControlFromType(type) {
      switch (type) {
        case "captcha-simple":
          return CaptchaSimpleControlVue;
        case "email-adddress":
        default:
          return EmailAddressControlVue;
      }
    },

    onFormControlValueChanged(controlId, value) {
      if (this.formValues[controlId] != value) {
        this.formValues[controlId] = value;
      }
    },

    onFormControlIsValidChanged(controlId, isValid) {
      this.formIsValid[controlId] = isValid;
      this.updateCanSubmit();
    },

    updateCanSubmit() {
      for (const fieldset of this.form.fieldsets) {
        for (const control of fieldset.controls) {
          // Only required controls affect this.
          if (!control.required) {
            continue;
          }

          const isValid =
            this.formIsValid[fieldset.id + "-" + control.id] || false;
          if (!isValid) {
            this.canSubmit = false;
            return;
          }
        }
      }

      this.canSubmit = true;
    },
  },
  mounted() {
    for (const fieldset of this.form.fieldsets) {
      for (const control of fieldset.controls) {
        this.formValues[fieldset.id + "-" + control.id] = "";
      }
    }

    this.updateCanSubmit();
  },
};
</script>

<style scoped>
.control-label {
  cursor: url("@/assets/cursors/hand.cur"), default;
}
</style>
