<template>
  <component v-if="getActiveView()" :is="getActiveView()" />
</template>

<script>
import { setView, viewManager } from "@/views/view-manager";
// import LoginViewVue from "./views/login/LoginView.vue";
import DesktopViewVue from "./views/desktop/DesktopView.vue";
import { activateScenario, Scenario } from "./scenarios/scenario";
import { mousePosition } from "./main";

export default {
  name: "App",
  components: {},
  methods: {
    getActiveView() {
      return viewManager.activeView;
    },
  },
  mounted() {
    /////////////////////////////
    // TODO: testing, load the scenario immediately so I don't have to go through the
    // login view every time.
    const scenario = Scenario.load("000");
    activateScenario(scenario);
    setView(DesktopViewVue);
    /////////////////////////////

    // Start with the login view.
    // setView(LoginViewVue);

    // Don't show context menu on right click.
    document.getElementById("app").oncontextmenu = (e) => {
      e.preventDefault();
    };
    // Track mouse position so it is always available when needed.
    document.onmousemove = (e) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
    };
  },
};
</script>

<style>
#app {
  font-size: 12px;
  color: white;
  font-smooth: never;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  font-family: "MS Sans Serif", Avenir, Helvetica, Arial, sans-serif;
  width: 850px;
  height: 640px;
  overflow: hidden;
  background-color: black;
  image-rendering: pixelated;
  cursor: url("@/assets/cursors/default.cur"), default;
}

#app ::selection {
  background-color: #000181;
  color: white;
}

html {
  padding: 0;
  margin: 0;
  scroll-behavior: auto;
}

body {
  padding: 0;
  margin: 0;
}

.no-select {
  user-select: none;
}
</style>
