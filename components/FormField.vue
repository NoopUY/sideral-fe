<template>
  <b-form-group
    :id="id"
    :label="label"
    :label-for="`input-${id}`"
    :description="description"
  >
    <b-form-input
      v-if="type === 'input'"
      :id="`input-${id}`"
      v-model="modelValue"
      type="text"
      :placeholder="placeholder"
      required
      :disabled="disabled"
      @input="onChange"
    />

    <b-form-input
      v-if="type === 'number'"
      :id="`input-${id}`"
      v-model="modelValue"
      type="number"
      :placeholder="placeholder"
      required
      :disabled="disabled"
      @input="onChange"
    />

    <b-form-textarea
      v-if="type === 'textarea'"
      :id="`input-${id}`"
      v-model="modelValue"
      :placeholder="placeholder"
      :rows="textareaDimensions.rows"
      :max-rows="textareaDimensions.maxRows"
      required
      :disabled="disabled"
      @input="onChange"
    />

    <b-form-datepicker
      v-if="type === 'date'"
      :id="`input-${id}`"
      v-model="modelValue"
      :disabled="disabled"
    />
  </b-form-group>
</template>

<script>

export default {
  props: {
    value: { type: [String, Date, Number, Array], default: '' },
    label: { type: String, required: true },
    description: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'input' },
    textareaDimensions: { type: Object, default: () => ({ rows: 5, maxRows: 10 }) }
  },

  data: () => ({
    modelValue: ''
  }),

  computed: {
    id () {
      return `input-${this.label.replace(/\s/g, '')}`
    }
  },

  watch: {
    value (val) {
      this.modelValue = val;
    }
  },

  mounted () {
    this.modelValue = this.value;
  },

  methods: {
    onChange () {
      this.$emit('input', this.modelValue);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
