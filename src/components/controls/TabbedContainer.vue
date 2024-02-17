<template>
  <div class="-tab-container">
    <span
      v-for="(tab, index) in tabs"
      :key="tab + index"
      class="-tab"
      :class="{ '-tab-active': selectedIndex === index }"
    >
      {{ tab }}
    </span>
  </div>
  <bevel-container>
    <slot />
  </bevel-container>
</template>

<script>
import BevelContainer from "@/components/controls/BevelContainer.vue";

export default {
  name: "TabbedContainer",
  components: {
    BevelContainer,
  },
  emits: ["selectTab"],
  props: {
    tabs: Array,
    selectedIndex: Number,
  },
};
</script>

<style scoped>
.-tab-container {
  color: black;
  padding-left: 2px;
  display: flex;
}

.-tab {
  display: inline-block;
  min-width: 42px;
  border-width: 1px;
  border-left-color: white;
  border-top-color: white;
  border-right-color: black;
  border-style: solid;
  border-bottom-style: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 6px;
  padding-right: 6px;
}

.-tab-active {
  border-bottom-style: solid;
  border-bottom-color: #c0c0c0;
  border-bottom-width: 4px;
  margin-left: -2px;
  margin-top: -2px;
}
</style>
