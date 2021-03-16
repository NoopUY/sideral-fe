<template>
  <div id="app">
    <nav-bar />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['auth']
}
</script><script>
export default {
  middleware: ['auth']
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/modules/_colors.scss";
@import "@/assets/style/modules/_constants.scss";
@import "@/assets/style/modules/_mixins.scss";
@import "@/assets/style/modules/_media.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Raleway", sans-serif;
  letter-spacing: 0.015em;
  font-size: 0.8em;
  position: absolute;
  color: $white;
  width: 100%;
  min-height: 100%;
  left: 0px;
  top: 0px;
  background-color: $color_primary;

  @media #{$md-screen} {
    flex-direction: column-reverse;
  }
}

.content {
  width: 100%;
  padding-left: $nav-width;
  height: 100%;
  min-height: 100vh;
}

</style>
