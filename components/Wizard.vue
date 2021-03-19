<template>
  <div class="wizard-container d-flex mt-5 mb-5">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="wizard-step-wrapper "
    >
      <div class="wizard-step">
        <div :class="['connector', {'bg-transparent': index === 0}]" />
        <div :class="['number', {'bg-accent text-white': step === value}]" @click="changeStep(step)">
          {{ index + 1 }}
          <div class="title text-primary">
            {{ step }}
          </div>
        </div>
        <div :class="['connector', {'bg-transparent': index === steps.length-1}]" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: String, default: '' },
    steps: { type: Array, default: () => [] }
  },

  data: () => ({
    modelValue: ''
  }),

  watch: {
    value (val) {
      this.modelValue = this.value;
    }
  },

  mounted () {
    this.modelValue = this.value;
  },

  methods: {
    changeStep (step) {
      this.modelValue = step;
      this.$emit('input', this.modelValue);
    }
  }
}
</script>

<style lang="scss" scoped>
  .wizard-step-wrapper {
    flex: 1;
  }

  .wizard-step {
    /* Center the content */
    align-items: center;
    display: flex;
    justify-content: center;

    .connector {
      flex: 1;
      height: 1px;
      background-color: rgba(0, 0, 0, .3);
    }

    .number {
      position: relative;
      cursor: pointer;
      /* Center the content */
      align-items: center;
      display: flex;
      justify-content: center;

      /* Rounded border */
      background-color: rgba(0, 0, 0, .3);
      border-radius: 9999px;
      height: 32px;
      width: 32px;

      /* OPTIONAL: Spacing between it and connectors */
      margin-left: 4px;
      margin-right: 4px;
    }

    .title {
      position: absolute;
      bottom: -20px;
      z-index: 9997;
      text-transform: uppercase;
      font-size: 0.8em;
      font-weight: bolder;
    }

  };

</style>
