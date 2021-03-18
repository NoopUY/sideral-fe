<template>
  <b-form-group
    :id="id"
    :label="label"
    :label-for="`input-${id}`"
    :description="description"
  >
    <b-form-input
      :id="`input-${id}`"
      v-model="modelValue"
      type="text"
      placeholder="Enter batch id"
      required
      @input="onChange"
    />
  </b-form-group>
</template>

<script>

export default {
  props: {
    value: { type: String, default: '' },
    label: { type: String, required: true },
    description: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false }
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
