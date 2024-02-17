<template>
  <base-window
    :id="`app-${this.appId}`"
    :titleTxt="this.getTitleText()"
    :titleIcon="this.getTitleIcon()"
    :position="this.getPosition()"
    :isActive="isActive"
    :style="{
      zIndex: this.zIndex,
    }"
    :width="500"
    :height="380"
    @mousedown="onMouseDown"
    @move="onMove"
  >
    <div class="-input-container">
      <div ref="output" class="-output">{{ output }}</div>
      <div ref="input" class="-input" :class="{ '-input-active': isActive }">
        <span>
          {{ getLocationDisplay() + ">" + input }}
        </span>
        <span class="-input-cursor" />
      </div>
    </div>
  </base-window>
</template>

<script>
import BaseWindow from "@/components/window/BaseWindow.vue";
import BaseApp from "@/components/apps/BaseApp.vue";
import { cmdProgramDir } from "@/components/apps/cmd/programs/cmd-program-dir";
import { cmdProgramCd } from "@/components/apps/cmd/programs/cmd-program-cd";

export default {
  name: "CMDApp",
  extends: BaseApp,
  components: {
    BaseWindow,
  },
  data() {
    return {
      location: "Desktop",
      output: "",
      input: "",
    };
  },
  methods: {
    /** @param {string} line */
    async print(line) {
      this.output += "\n" + line;
      // Wait for Vue to render the new output text to the element, then scroll it
      // so the newest text appears at the bottom, above the input.
      await this.$nextTick();
      this.$refs.output.scrollTop = this.$refs.output.scrollHeight;
    },

    /** @param {string} location */
    setLocation(location) {
      this.location = location;
    },

    submitInput() {
      this.input = this.input.trim();

      const output = this.getLocationDisplay() + ">" + this.input;
      this.print(output);

      if (this.input === "") {
        return;
      }

      // Parse input into command and arguments:
      const args = [];
      let currentArg = "";
      let isQuoted = false;
      let isEscaped = false;
      for (let i = 0; i < this.input.length; i++) {
        const c = this.input[i];

        if (isEscaped) {
          currentArg += c;
          isEscaped = false;
          continue;
        }

        switch (c) {
          case " ":
            if (isQuoted) {
              currentArg += c;
            } else {
              if (currentArg.trim().length > 0) {
                args.push(currentArg);
              }
              currentArg = "";
            }
            break;
          case '"':
            if (isQuoted) {
              isQuoted = false;
            } else {
              if (currentArg === "") {
                isQuoted = true;
              } else {
                // TODO: parsing error, trying to open quote within arg.
              }
            }
            break;
          case "\\":
            isEscaped = true;
            break;
          default:
            currentArg += c;
        }
      }
      if (currentArg.trim().length > 0) {
        args.push(currentArg);
      }
      currentArg = "";

      const command = args.shift();
      this.execute(command, args);

      this.input = "";
    },

    /**
     * @param {string} command
     * @param {string[]} args
     */
    execute(command, args) {
      console.info("execute cmd", command, args);

      command = command.toLowerCase();

      const programs = {
        dir: cmdProgramDir,
      };

      switch (command) {
        // Special programs that modify the state of the cmd itself:
        case "cls":
          this.output = " ";
          break;
        case "reset":
          this.output = "";
          this.printStartScreen();
          break;
        case "cd":
          {
            const programResult = cmdProgramCd(this.location, args);
            const programCode = programResult.shift();
            if (programCode === 0) {
              this.print(" ");
              this.setLocation(programResult[0]);
            } else {
              this.printCommandOutput(programResult);
            }
          }
          break;

        // Any other programs:
        default:
          {
            const program = programs[command];
            if (program) {
              /** @type {(string|number)[]} programResult */
              const programResult = program(this.location, args);
              /** const programCode = */ programResult.shift();
              this.printCommandOutput(programResult);
            } else {
              this.printBadCommandError();
            }
          }

          break;
      }
    },

    /** @param {string[]} lines */
    printCommandOutput(lines) {
      if (lines.length == 0) {
        return;
      }
      for (const line of lines) {
        this.print(line);
      }
      this.print(" ");
    },

    printBadCommandError() {
      this.print("Bad command or file name");
      this.print(" ");
    },

    printStartScreen() {
      this.print("Microsoft (R) Windows 98");
      this.print("   (C) Copyright Microsoft Corp 1981-1999.");
      this.print(" ");
    },

    getLocationDisplay() {
      return "/" + this.location;
    },

    /** @param {KeyboardEvent} e */
    onKeyPress(e) {
      if (!this.isActive) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (e.key.length === 1) {
        this.input += e.key;
      }
    },

    /** @param {KeyboardEvent} e */
    onKeyDown(e) {
      if (!this.isActive) {
        return;
      }

      switch (e.key) {
        case "Backspace":
          if (this.input.length > 0) {
            this.input = this.input.substring(0, this.input.length - 1);
          }
          break;
        case "Enter":
          this.submitInput();
          break;
      }
    },
  },
  mounted() {
    this.updateTitle("Command Prompt");
    this.updateIcon("icons/16/cmd");

    this.printStartScreen();

    document.addEventListener("keypress", this.onKeyPress);
    document.addEventListener("keydown", this.onKeyDown);
  },
  unmounted() {
    document.removeEventListener("keypress", this.onKeyPress);
    document.removeEventListener("keydown", this.onKeyDown);
  },
};
</script>

<style scoped>
.-input-container {
  width: 100%;
  height: 100%;
  padding: 2px;
  box-sizing: border-box;
  background-color: black;
  color: #c2c6ca;
  font-family: Consolas, "Courier New", Courier, monospace;
  font-size: 12px;
  user-select: none;
  line-height: 1em;
  font-weight: bold;
}

.-output {
  white-space: pre-wrap;
  max-height: calc(100% - 1em);
  overflow-y: scroll;
  scrollbar-width: none;
}

.-input > * {
  vertical-align: middle;
}

.-input-active .-input-cursor {
  display: inline-block;
  width: 0.5em;
  height: 1em;
  border-bottom-style: none;
  border-bottom-color: #c2c6ca;
  border-bottom-width: 2px;
  animation-name: input-cursor-blink;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@keyframes input-cursor-blink {
  0% {
    border-bottom-style: none;
  }
  100% {
    border-bottom-style: solid;
  }
}
</style>
