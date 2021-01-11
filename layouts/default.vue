<template>
  <div id="app">
    <nav-bar />
    <Nuxt />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/style/modules/_colors.scss";
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
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: $color_primary;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  @media #{$md-screen} {
    flex-direction: column-reverse;
  }
}
</style>

<script>
export default {
  middleware: ['auth']
}
</script>
