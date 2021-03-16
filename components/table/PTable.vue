<template>
  <div class="w-100 mt-5">
    <div class="w-100 d-flex justify-content-end mb-2">
      <Search />
      <slot name="actions" />
    </div>

    <Table
      :id="id"
      :items="modelItems"
      :fields="fields"
      :busy="modelBusy"
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
    modelItems: [],
    modelBusy: false
  }),

  watch: {
    items (val) {
      this.modelItems = val;
    },
    busy (val) {
      this.modelBusy = val
    }
  },

  mounted () {
    this.modelItems = this.items;
    this.modelBusy = this.busy;
  },

  methods: {
    onActionClick (action, item) {
      this.$emit('actionClick', action, item);
    },

    onBulkActionClick (action, items) {
      this.$emit('bulkActionClick', action, items);
    }
  }
}
</script>

<style>

</style>
