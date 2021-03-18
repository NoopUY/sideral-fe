<template>
  <div class="chip">
    <div class="chip-content">
      <slot />
    </div>
    <close-button size="xs" @click="onClick" />
  </div>
</template>

<script>

export default {

  methods: {
    onClick ($event) {
      this.$emit('click', $event);
    }
  }
}
</script>

<style lang="scss" scoped>
  .chip {
     /* Center the content */
    align-items: center;
    display: inline-flex;
    justify-content: center;

    /* Background color */
    background-color: rgba(0, 0, 0, .1);

    /* Rounded border */
    border-radius: 9999px;

    /* Spacing */
    padding: 4px 8px;
  }

  .chip-content {
    margin-right: 4px;
    font-size: 0.65em;
    text-transform: uppercase;
    font-weight: bold;
  }

</style>
