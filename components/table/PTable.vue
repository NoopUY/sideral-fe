<template>
  <div class="w-100">
    <div class="w-100 d-flex justify-content-end">
      <Search />
    </div>

    <Table
      :id="id"
      :items="modelItems"
      :fields="fields"
      :busy="busy"
    />

    <Pagination :id="id" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => ([])
    },
    fields: {
      type: Array,
      default: () => ([])
    },
    busy: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: () => ([])
    }
  },

  data: () => ({
    modelItems: []
  }),

  watch: {
    items (val) {
      this.modelItems = val;
    },
    busy (val) {
      this.busy = val
    }
  },

  mounted () {
    this.modelItems = this.items;
  },

  methods: {
    onDelete (item) {
      this.$emit('onDelete', item);
    }
  }
}
</script>

<style>

</style>
