<template>
  <div id="searchbox">
    <b-form-input id="searchbox-input" type="text" size="sm" :placeholder="placeholder" />
    <b-icon id="searchbox-icon" icon="search" scale="1.3" variant="accent" class="mr-2" />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">

@import "@/assets/style/modules/_colors.scss";

  #searchbox {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    border: 2px solid darken($color_background, 10);
    border-radius: 1em;
    padding: 1px 10px;
    background-color: #ffffff;
    min-width: 300px;
  }

  #searchbox-input {
    border-color: transparent;
    flex:1;
    background-color: transparent;
  }

</style>
