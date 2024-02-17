<template>
  <div>
    <div class="-page">
      <div>
        <h1 class="-header">
          <img :src="require(`@/assets/img/apps/ie/not-found.png`)" />
          <span>The page cannot be found</span>
        </h1>
      </div>
      <div>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <div class="-divider" />
      <div>
        <p>
          HTTP 404 - File not found
          <br />
          Internet Explorer
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
  components: {},
};
</script>

<style scoped>
.-page {
  padding: 18px;
}

.-header {
  font-size: 20px;
  margin-bottom: 24px;
}

.-header > img {
  margin-right: 10px;
}

.-header > * {
  vertical-align: top;
}

.-divider {
  margin-top: 16px;
  height: 2px;
  background-color: #c6c3c6;
}
</style>
