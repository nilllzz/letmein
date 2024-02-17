<template>
  <div class="custom-page">
    <!-- Include custom page style. -->
    <link
      v-if="page && page.style"
      rel="stylesheet"
      type="text/css"
      :href="`./page-styles/${page.style}/style.css`"
    />
    <!-- Page content -->
    <div class="page-container" ref="container">
      <template v-for="block of this.page.blocks">
        <page-form
          v-if="block.type === 'form'"
          :key="block.id"
          :form="getBlockForm(block.form)"
        />
        <component
          v-else
          :key="block.id"
          :is="getBlockForType(block.type)"
          :data="block.data"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { Scenario } from "@/scenarios/scenario";
import PageForm from "@/components/apps/ie/form/PageForm.vue";
import ImageBlockVue from "@/components/apps/ie/pages/blocks/ImageBlock.vue";
import ParagraphVue from "@/components/apps/ie/pages/blocks/ParagraphBlock.vue";
import HeadingBlockVue from "./blocks/HeadingBlock.vue";

export default {
  name: "FormPage",
  components: {
    PageForm,
  },
  props: {
    scenario: Scenario,
    page: Object,
  },
  methods: {
    getBlockForm(formId) {
      return this.page.forms.find((x) => x.id === formId);
    },

    getBlockForType(type) {
      switch (type) {
        case "image":
          return ImageBlockVue;
        case "paragraph":
          return ParagraphVue;
        case "heading":
          return HeadingBlockVue;
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  margin: 4px;
}
</style>
