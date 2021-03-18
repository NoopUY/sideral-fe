<template>
  <button :class="['close-button', {'sm': size === 'sm', 'xs': size === 'xs'}]" @click="onClick">
    <div class="close-slash" />
    <div class="close-slash alt" />
  </button>
</template>

<script>

export default {
  props: {
    size: { type: String, default: '' }
  },

  methods: {
    onClick ($event) {
      $event.preventDefault();
      this.$emit('click', $event);
    }
  }
}
</script>

<style lang="scss" scoped>

  .close-button {
    /* Reset */
    background-color: transparent;
    border-color: transparent;

    /* Cursor */
    cursor: pointer;

    /* Size */
    height: 35px;
    width: 35px;

    /* Used to position the inner */
    position: relative;

    &.sm {
      /* Size */
      height: 25px;
      width: 25px;
    }

    &.xs {
      /* Size */
      height: 15px;
      width: 15px;
    }
  }

  .close-slash {
    /* Background color */
    background-color: rgba(0, 0, 0, 0.3);

    /* Position */
    left: 0px;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%) rotate(45deg);

    /* Size */
    height: 1px;
    width: 100%;

    &.alt {
      transform: translate(-50%, 0%) rotate(45deg);
      left: 50%;
      top: 0px;

      /* Size */
      height: 100%;
      width: 1px;
    }
  }

</style>
