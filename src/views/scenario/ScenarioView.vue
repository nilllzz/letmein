<template>
  <div class="-background">
    <base-window titleTxt="Select Scenario" isActive>
      <div>
        <drop-down
          :options="scenarioOptions"
          @input="onSelectChange"
          :value="selectedScenarioOption"
        />
      </div>
      <div v-if="!selectedScenario">
        Select a Scenario in the dropdown above.
      </div>
      <div v-else>
        <div>
          {{ selectedScenario.info.name }}
        </div>
        <div>
          {{ selectedScenario.info.difficulty }}
        </div>
        <div>
          <push-button
            txt="OK"
            textAlign="center"
            @click="onClickStartScenario"
          />
        </div>
      </div>
    </base-window>
  </div>
</template>

<script>
import BaseWindow from "@/components/window/BaseWindow.vue";
import DropDown from "@/components/controls/DropDown.vue";
import {
  activateScenario,
  getAllScenarios,
  Scenario,
} from "@/scenarios/scenario";
import PushButton from "@/components/controls/PushButton.vue";
import { setView } from "../view-manager";
import DesktopViewVue from "../desktop/DesktopView.vue";

export default {
  name: "ScenarioView",
  components: {
    BaseWindow,
    DropDown,
    PushButton,
  },
  data() {
    return {
      scenarioOptions: [],
      selectedScenarioOption: "",
      selectedScenario: null,
    };
  },
  methods: {
    onSelectChange(e) {
      if (!e) {
        return;
      }

      const selectedOption = e.target.value;
      this.selectedScenarioOption = selectedOption;

      if (selectedOption === "-") {
        this.selectedScenario = null;
      } else {
        this.selectedScenario = Scenario.load(selectedOption);
      }
    },

    onClickStartScenario() {
      if (!this.selectedScenario) {
        console.warn("No scenario selected.");
        return;
      }

      activateScenario(this.selectedScenario);
      setView(DesktopViewVue);
    },
  },
  mounted() {
    this.scenarioOptions.push({ id: "-", text: "<none>" });
    const allScenarios = getAllScenarios();
    for (const scenarioDef of allScenarios) {
      this.scenarioOptions.push({
        id: scenarioDef.id,
        text: scenarioDef.name,
      });
    }
  },
};
</script>

<style scoped>
.-background {
  background-color: #008080;
  width: 100%;
  height: 100%;

  position: relative;
  color: black;
}
</style>
