<template>
  <div id="app">
    <nav-bar />
    <div id="app-content" class="d-flex flex-column">
      <div id="content-header" class="mt-2 mx-4 py-3 d-flex justify-content-between align-items-center">
        <div id="page-name">
          {{ pageName }}
        </div>
        <slot name="header-actions" />
      </div>
      <slot name="page-content" />
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
  background-color: $color_background;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;

  @media #{$md-screen} {
    flex-direction: column-reverse;
  }
}

#app-content {
  width: 100%;
}

#content-header {
  color: $color_text_dark;
  border-bottom: 2px solid darken($color_background, 3);
}

#page-name {
  font-size: 2em;
  font-weight: 500;
  text-transform: capitalize;
}

</style>
