<template>
  <b-table
    :id="id"
    :ref="`ref_${id}`"
    striped
    hover
    borderless
    dark
    :items="modelItems"
    :fields="fields"
    :busy="busy"
    select-mode="range"
    responsive
  >
    <template #table-busy>
      <div class="text-center my-2">
        <b-spinner class="align-middle mr-2" />
        <strong>Loading...</strong>
      </div>
    </template>

    <template #cell(tags)="data">
      <b-badge v-for="tag in data.value" :key="tag" class="ml-1" variant="info">
        {{ tag }}
      </b-badge>
    </template>

    <template #cell(actions)="data">
      <span v-for="action in data.value" :key="action.action">

        <b-button
          :variant="action.variant || 'transparent'"
          :disabled="($nuxt.$loading && $nuxt.$loading.show) || action.disabled"
          :size="action.size || 'sm'"
          :class="action.class || 'text-white'"
          class="ml-1"
          @click="onActionClick(action, data.item)"
        >
          <fa :icon="['fas', action.icon]" />
        </b-button>
      </span>
    </template>
  </b-table>
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
    onActionClick (action, item) {
      this.$emit('onActionClick', action, item);
    }
  }
}
</script>

<style>

</style>
