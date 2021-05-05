<template>
  <div id="content-header" class="mt-2 mx-4 py-3 d-flex justify-content-around align-items-center">
    <b-button v-if="back" variant="secondary" class="button-header hide-mobile text-white mr-3" pill @click="$router.go(-1)">
      <b-icon icon="arrow-left" />
    </b-button>
    <div id="page-name" class="hide-mobile flex-grow-1">
      <slot name="page-name">
        {{ pageName }}
      </slot>
    </div>

    <slot name="header-actions" />

    <b-dropdown variant="clear" no-caret boundary="viewport" class="ml-2" size="sm">
      <template #button-content>
        <b-button variant="white" class="button-header hide-mobile">
          {{ $i18n.locale }} <b-icon icon="caret-down-fill" />
        </b-button>
      </template>

      <b-dropdown-item
        v-for="locale in availableLocales"
        :key="locale.code"
        :disabled=" ($nuxt.$loading && $nuxt.$loading.show)"
      >
        <nuxt-link :to="switchLocalePath(locale.code)">
          {{ locale.name }}
        </nuxt-link>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>

export default {
  props: {
    back: { type: Boolean, default: false }
  },
  computed: {
    pageName () {
      return this.$t(this.$route.name.split('_')[0]);
    },
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
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
