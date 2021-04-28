<template>
  <div :id="id" class="searchbox">
    <b-form-input v-model="search" class="searchbox-input" type="text" size="sm" :placeholder="placeholder" />
    <b-icon icon="search" scale="1.3" variant="accent" class="mr-2 searchbox-icon" />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    id: { type: String, required: true }
  },
  computed: {
    search: {
      set (search) {
        this.$store.commit(this.id + '/search', search);
      },
      get () {
        return this.$store.getters[this.id + '/search'];
      }
    }
  }
}
</script>

<style lang="scss">

@import "@/assets/style/modules/_colors.scss";
@import "@/assets/style/modules/_media.scss";

  .searchbox {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    border: 2px solid darken($color_background, 10);
    border-radius: 1em;
    padding: 1px 10px;
    background-color: #ffffff;
    min-width: 300px;

    @media #{$md-screen} {
      width: 100%;
    }
  }

  .searchbox-input {
    border-color: transparent;
    flex:1;
    background-color: transparent;
  }

</style>
