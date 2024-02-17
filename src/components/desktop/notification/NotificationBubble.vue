<template>
  <div
    class="-notification-bubble no-select"
    :style="{ top: `${y}px`, left: `${x}px` }"
  >
    <div class="-notification-bubble-header">
      <img
        v-if="icon"
        draggable="false"
        class="-icon"
        :src="require(`@/assets/img/${icon}.png`)"
      />
      <strong v-if="header">{{ header }}</strong>
    </div>
    <div>{{ body }}</div>
  </div>
</template>

<script>
export default {
  name: "NotificationBubble",
  components: {},
  props: {
    x: Number,
    y: Number,
    icon: String,
    header: String,
    body: String,
  },
};
</script>

<style scoped>
.-notification-bubble {
  position: absolute;
  background-color: #ffffe1;
  border: 1px solid #000000;
  border-radius: 6px;
  font-size: 12px;
  min-width: 48px;
  padding: 10px;
  filter: drop-shadow(5px 5px 6px rgba(0, 0, 0, 0.35));
  cursor: url("@/assets/cursors/hand.cur"), pointer;
  color: black;
}

.-notification-bubble::before {
  content: "";
  position: absolute;
  bottom: -20px;
  right: 15px;
  border-top: 20px solid black;
  border-left: 20px solid transparent;
}

.-notification-bubble::after {
  content: "";
  position: absolute;
  bottom: -18px;
  right: 16px;
  border-top: 18px solid #ffffe1;
  border-left: 18px solid transparent;
}

.-notification-bubble-header {
  margin-bottom: 8px;
  font-weight: bold;
}

.-notification-bubble-header > * {
  vertical-align: middle;
}

.-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
