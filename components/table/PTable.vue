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
      @actionClick="onActionClick"
      @bulkActionClick="onBulkActionClick"
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
    onActionClick(action, item) {
      this.$emit("actionClick", action, item);
    },

    onBulkActionClick(action, items) {
      this.$emit("bulkActionClick", action, items);
    },
  }
}
</script>

<style>

</style>
