<template>
  <div id="app">
    <div class="app-container">
      <!-- Sidebar -->
      <aside class="app-container__sidebar">
        <nav-bar />
      </aside>

      <!-- Main -->
      <main class="app-container__main">
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script>

export default {
  middleware: ['auth'],
  computed: {
    pageName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/modules/_colors.scss";
@import "@/assets/style/modules/_constants.scss";

.app-container {
    display: flex;
}

.app-container__sidebar {
    width: $nav-width;
    height: 100vh;
}

.app-container__main {
    /* Take the remaining width */
    flex: 1;

    /* Make it scrollable */
    overflow: auto;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Raleway", sans-serif;
  letter-spacing: 0.015em;
  font-size: 0.8em;
  color: $color_text_dark;
  background-color: $color_background;
}

</style>
