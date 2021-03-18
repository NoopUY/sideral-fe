<template>
  <div class="tag-input-container">
    <chip
      v-for="(tag, index) in modelValue"
      :key="index"
      class="mr-1 bg-accent text-white mt-1"
      @click="removeTag(index)"
    >
      {{ tag }}
    </chip>

    <b-form-input
      v-model="newTag"
      class="tag-input-input mt-1"
      type="text"
      size="sm"
      :placeholder="placeholder"
      @keydown.enter="onNewTag"
    />
  </div>
</template>

<script>
import undo from '@/mixins/undoAction';

export default {
  mixins: [undo],

  props: {
    value: { type: [Array], default: () => [] },
    placeholder: { type: String, default: 'New tag' }
  },

  data: () => ({
    modelValue: [],
    newTag: ''
  }),

  watch: {
    value (val) {
      this.modelValue = [...val];
    }
  },

  mounted () {
    this.modelValue = [...this.value];
  },

  methods: {
    onChange () {
      this.$emit('input', this.modelValue);
    },

    onNewTag ($event) {
      $event.preventDefault();
      this.modelValue.push(this.newTag);
      this.newTag = '';
      this.onChange();
    },

    removeTag (index) {
      const removedTag = this.modelValue[index];
      this.modelValue.splice(index, 1);
      this.onChange();
      this.undoAction(`Remove tag '${removedTag}'`, 5000, () => {
        this.modelValue.splice(index, 0, removedTag);
        this.onChange();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/modules/_colors.scss";
@import "@/assets/style/modules/_media.scss";

  .tag-input-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
    border: 2px solid darken($color_background, 13);
    border-radius: 0.2em;
    padding: 10px 10px;
    background-color: #ffffff;
    font-size: 1.3em;
    margin-bottom: 10px;
    width: 100%;
  }

  .tag-input-input {
    border-color: transparent;
    flex:1;
    background-color: transparent;
  }

</style>
