<template>
  <div id="content-header" class="mt-2 mx-4 py-3 d-flex justify-content-between align-items-center">
    <div id="page-name" class="hide-mobile">
      <slot name="page-name">
        {{ pageName }}
      </slot>
    </div>
    <slot name="header-actions" />
  </div>
</template>

<script>

export default {
  computed: {
    pageName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/modules/_colors.scss";

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
