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
    @mousedown="onMouseDown"
    @move="onMove"
  >
    <div class="-main-area">
      <div class="-work-area">
        <div class="-toolbar">
          <push-button
            icon="apps/paint/pencil"
            noMinWidth
            :isActive="activeTool === `pencil`"
            @click="setActiveTool('pencil')"
          />
          <push-button
            icon="apps/paint/eraser"
            noMinWidth
            :isActive="activeTool === `eraser`"
            @click="setActiveTool('eraser')"
          />
          <push-button
            icon="apps/paint/color-picker"
            noMinWidth
            :isActive="activeTool === `color-picker`"
            @click="setActiveTool('color-picker')"
          />
          <push-button
            icon="apps/paint/fill-bucket"
            noMinWidth
            :isActive="activeTool === `fill-bucket`"
            @click="setActiveTool('fill-bucket')"
          />
        </div>
        <bevel-container inverse class="-canvas-container">
          <canvas
            ref="canvas"
            :width="canvasWidth"
            :height="canvasHeight"
            @mousemove="onCanvasMouseMove"
            @mousedown="onCanvasMouseDown"
            @mouseenter="onCanvasMouseEnter"
          />
        </bevel-container>
      </div>
      <div class="-colors">
        <bevel-container inverse>
          <div class="-active-colors">
            <div
              class="-active-color-swatch"
              :style="{ top: '3px', left: '2px', 'z-index': 2 }"
              @click="isBackgroundColorActive = false"
            >
              <div :style="{ 'background-color': foregroundColor }"></div>
            </div>
            <div
              class="-active-color-swatch"
              :style="{
                top: '9px',
                left: '10px',
                'z-index': isBackgroundColorActive ? 3 : 1,
              }"
              @click="isBackgroundColorActive = true"
            >
              <div :style="{ 'background-color': backgroundColor }"></div>
            </div>
          </div>
        </bevel-container>

        <div class="-color-palette">
          <div
            v-for="colorList of colors"
            :key="colorList[0]"
            class="-color-palette-list"
          >
            <div
              v-for="color of colorList"
              :key="color"
              class="-color-palette-item"
              :style="{ 'background-color': color }"
              @click="setCurrentColor(color)"
            >
              <div class="-color-palette-item-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #statusBar>
      <span class="no-select">{{ canvasWidth }} × {{ canvasHeight }} px</span>
    </template>
  </base-window>
</template>

<script>
import BaseWindow from "@/components/window/BaseWindow.vue";
import BaseAppVue from "../BaseApp.vue";
import BevelContainer from "@/components/controls/BevelContainer.vue";
import PushButton from "@/components/controls/PushButton.vue";
import { rgbToHex } from "@/color-helper";
import { floodFill } from "./flood-fill";
import { resolveFileSystemFileLink } from "@/file-system";

export default {
  name: "PaintApp",
  extends: BaseAppVue,
  components: {
    BaseWindow,
    BevelContainer,
    PushButton,
  },
  data() {
    return {
      canvasWidth: 500,
      canvasHeight: 500,
      activeTool: "pencil",
      lastMousePosition: { x: 0, y: 0 },
      foregroundColor: "#000000",
      backgroundColor: "#ffffff",
      isBackgroundColorActive: false,
      colors: [
        [
          "#000000",
          "#7b7b7b",
          "#7b0000",
          "#7b7b00",
          "#007b00",
          "#007b7b",
          "#00007b",
          "#7b007b",
          "#7b7b39",
          "#003939",
          "#007bff",
          "#00397b",
          "#3900ff",
          "#7b3900",
        ],
        [
          "#ffffff",
          "#bdbdbd",
          "#ff0000",
          "#ffff00",
          "#00ff00",
          "#00ffff",
          "#0000ff",
          "#ff00ff",
          "#ffff7b",
          "#00ff7b",
          "#7bffff",
          "#7b7bff",
          "#ff007b",
          "#ff7b39",
        ],
      ],
    };
  },
  methods: {
    setActiveTool(tool) {
      this.activeTool = tool;
    },

    setLastMousePosition(mouseEvent) {
      this.lastMousePosition = { x: mouseEvent.offsetX, y: mouseEvent.offsetY };
    },

    setCurrentColor(color) {
      if (this.isBackgroundColorActive) {
        this.backgroundColor = color;
      } else {
        this.foregroundColor = color;
      }
    },

    onCanvasMouseDown(e) {
      this.setLastMousePosition(e);

      if (this.activeTool === "color-picker") {
        const ctx = this.$refs.canvas.getContext("2d");
        const imgData = ctx.getImageData(
          this.lastMousePosition.x,
          this.lastMousePosition.y,
          1,
          1
        );
        const hexColor = rgbToHex(
          imgData.data[0],
          imgData.data[1],
          imgData.data[2]
        );
        this.setCurrentColor(hexColor);
        this.setActiveTool("pencil");
        return;
      } else if (this.activeTool === "fill-bucket") {
        floodFill(
          this.$refs.canvas,
          this.foregroundColor,
          this.lastMousePosition.x,
          this.lastMousePosition.y
        );
      }
    },

    onCanvasMouseEnter(e) {
      this.setLastMousePosition(e);
    },

    onCanvasMouseMove(e) {
      // Mouse button 1 needs to be pushed down.
      if (e.buttons !== 1) {
        return;
      }
      // Do nothing for color picker.
      if (this.activeTool === "color-picker") {
        return;
      }
      if (this.activeTool === "fill-bucket") {
        return;
      }

      const ctx = this.$refs.canvas.getContext("2d");

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.lineCap = "butt";
      ctx.strokeStyle = this.foregroundColor;

      if (this.activeTool === "eraser") {
        ctx.strokeStyle = this.backgroundColor;
        ctx.lineWidth = 5;
      }

      // Start the path from the previous mouse position.
      ctx.moveTo(this.lastMousePosition.x, this.lastMousePosition.y);
      // Set the new mouse position, and then draw the line to it.
      this.setLastMousePosition(e);
      ctx.lineTo(this.lastMousePosition.x, this.lastMousePosition.y);
      ctx.stroke();
    },
  },
  mounted() {
    let filename = "Untitled";
    if (this.srcFile && this.srcFile?.name !== "Paint") {
      filename = this.srcFile.name;
    }

    this.updateTitle(filename + " - Paint");
    this.updateIcon("icons/16/paint");

    // By default, fill the canvas with white.
    let ctx = this.$refs.canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);

    // If the app was primed with a file, load the image from the file.
    if (this.srcFile && this.srcFile.content) {
      const img = new Image();
      img.onload = async () => {
        // Adjust canvas size to be at least the size of the image.
        if (img.width > this.canvasWidth) {
          this.canvasWidth = img.width;
        }
        if (img.height > this.canvasHeight) {
          this.canvasHeight = img.height;
        }
        // Wait for element to update to new size.
        await this.$nextTick();
        // Get context and draw image.
        ctx = this.$refs.canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
      };
      const realFilePath = resolveFileSystemFileLink(this.srcFile.content);
      img.src = require(`@/assets/files/scenarios/${realFilePath}`);
    }
  },
};
</script>

<style scoped>
.-main-area {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.-work-area {
  display: flex;
  flex-grow: 1;
  max-height: calc(100% - 48px);
}

.-toolbar {
  padding-left: 4px;
  padding-right: 4px;
  width: 34px;
  box-sizing: border-box;
}

.-canvas-container {
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
}

.-canvas-container :deep(.-bevel-container-inner) {
  padding: 2px;
  overflow: scroll;
  box-sizing: border-box;
}

.-colors {
  display: flex;
  align-items: center;
  height: 48px;
  width: 300px;
}

.-active-colors {
  width: 28px;
  height: 28px;
  background: url("@/assets/img/misc/dotted.png");
  position: relative;
}

.-active-color-swatch {
  border-width: 1px;
  border-style: solid;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-bottom-color: #7b7b7b;
  border-right-color: #7b7b7b;
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: #bdbdbd;
  padding: 1px;
  box-sizing: border-box;
}

.-active-color-swatch > div {
  width: 11px;
  height: 11px;
}

.-color-palette {
  border-width: 1px;
  border-style: solid;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-bottom-color: #7b7b7b;
  border-right-color: #7b7b7b;
  height: 30px;
  margin-left: 2px;
}

.-color-palette-list {
  display: flex;
}

.-color-palette-item {
  width: 15px;
  height: 15px;
  border-width: 1px;
  border-style: solid;
  border-top-color: #7b7b7b;
  border-left-color: #7b7b7b;
  border-bottom-color: #ffffff;
  border-right-color: #ffffff;
  box-sizing: border-box;
}

.-color-palette-item-inner {
  border-width: 1px;
  border-style: solid;
  border-top-color: #000000;
  border-left-color: #000000;
  border-bottom-color: #bdbdbd;
  border-right-color: #bdbdbd;
  height: 100%;
  box-sizing: border-box;
}
</style>
