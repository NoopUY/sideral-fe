<template>
  <div class="w-100">
    <div class="mx-4 py-3 d-flex align-items-center justify-content-start content-header">
      <Search placeholder="Search by code or name..." />
      <slot name="actions" />
    </div>

    <Pagination :id="id" />

    <Table
      :id="id"
      :items="modelItems"
      :fields="fields"
      :busy="modelBusy"
      @actionClick="onActionClick"
      @bulkActionClick="onBulkActionClick"
    />
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

<style lang="scss">
@import "@/assets/style/modules/_colors.scss";

    .content-header {
      border-bottom: 2px solid darken($color_background, 3);
    }
</style>
