<template>
  <div class="-background">
    <base-window
      titleTxt="Welcome to Windows"
      :isActive="true"
      :position="{ x: 850 / 2 - 500 / 2, y: 140 }"
      :width="500"
      :height="150"
      :showHelp="true"
      @requestHelp="onClickHelp"
    >
      <div class="-window">
        <div class="-left">
          <img
            draggable="false"
            :src="require(`@/assets/img/icons/48/login-key.png`)"
          />
        </div>
        <div class="-center">
          <div class="-center-text">
            Type your user name and token to log on to Game Jolt.
          </div>
          <div>
            <div class="-input-row">
              <span class="-input-label">User name:</span>
              <text-input
                class="-input-field"
                :value="username"
                @input="onUpdateUsername"
              />
            </div>
            <div class="-input-row">
              <span class="-input-label">Token:</span>
              <text-input
                class="-input-field"
                type="password"
                :value="token"
                @input="onUpdateToken"
              />
            </div>
          </div>
        </div>
        <div class="-right">
          <push-button txt="OK" textAlign="center" @click="onClickOK" />
          <push-button txt="Cancel" textAlign="center" />
        </div>
      </div>
    </base-window>
  </div>
</template>

<script>
import BaseWindow from "@/components/window/BaseWindow.vue";
import TextInput from "@/components/controls/TextInput.vue";
import PushButton from "@/components/controls/PushButton.vue";
import { setView } from "@/views/view-manager";
import ScenarioViewVue from "../scenario/ScenarioView.vue";

export default {
  name: "LoginView",
  components: {
    BaseWindow,
    TextInput,
    PushButton,
  },
  data() {
    return {
      username: "",
      token: "",
    };
  },
  methods: {
    onClickHelp() {
      window.open("https://gamejolt.com/help/tokens", "_blank");
    },

    onUpdateUsername(e) {
      if (!e) {
        return;
      }
      this.username = e.target.value;
    },

    onUpdateToken(e) {
      if (!e) {
        return;
      }
      this.token = e.target.value;
    },

    onClickOK() {
      // TODO: validate login, store login creds if successful.
      setView(ScenarioViewVue);
    },
  },
  mounted() {
    const queryStr = window.location.search;
    const query = new URLSearchParams(queryStr);
    const username = query.get("gjapi_username") || "";
    const token = query.get("gjapi_token") || "";

    this.username = username;
    this.token = token;
  },
};
</script>

<style scoped>
.-background {
  background-color: #008080;
  width: 100%;
  height: 100%;

  position: relative;
}

.-window {
  padding: 10px;
  color: black;
  display: flex;
  justify-content: space-between;
}

.-left {
  margin-left: 12px;
}

.-center-text {
  margin-bottom: 24px;
}

.-input-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.-input-label {
  display: inline-block;
  width: 72px;
}

.-input-field {
  width: 135px;
}

.-right > * {
  margin-bottom: 4px;
}
</style>
