<template>
  <b-table
    :id="id"
    :ref="`ref_${id}`"
    striped
    hover
    borderless
    dark
    :items="modelItems"
    :fields="modelFields"
    :busy="modelBusy"
    select-mode="range"
    :selectable="true"
    responsive
    @row-selected="onRowSelected"
  >
    <template #head(check)>
      <b-form-checkbox :checked="allSelected" @change="onSelectAll" />
    </template>

    <template v-if="selectedItems.length > 0" #thead-top>
      <b-tr>
        <b-th colspan="2">
          <b-dropdown text="Actions">
            <span v-for="action in modelItems[0].actions" :key="action.action">
              <b-dropdown-item
                v-if="action.type === 'action' && action.addToBulk"
                :disabled="
                  ($nuxt.$loading && $nuxt.$loading.show) || action.disabled
                "
                @click="onBulkActionClick(action)"
              >
                <span
                  :class="`d-flex justify-content-between ${action.class}`"
                >
                  <b-icon :icon="action.icon" class="mr-3" />
                  {{ action.name }} selected
                </span>
              </b-dropdown-item>
            </span>
          </b-dropdown>
        </b-th>
      </b-tr>
    </template>

    <template #table-busy>
      <div class="text-center my-2">
        <b-spinner class="align-middle mr-2" />
        <strong>Loading...</strong>
      </div>
    </template>

    <template #cell(check)="data">
      <b-form-checkbox
        :checked="data.rowSelected"
        @change="onSelectRow($event, data)"
      />
    </template>

    <template #cell(tags)="data">
      <b-badge
        v-for="tag in data.value"
        :key="tag"
        class="ml-1"
        :variant="tag.variant || 'accent'"
      >
        {{ tag }}
      </b-badge>
    </template>

    <template #cell(actions)="data">
      <b-dropdown variant="clear" no-caret>
        <template #button-content>
          <b-icon icon="three-dots-vertical" class="text-white" />
        </template>

        <span v-for="action in data.value" :key="action.action">
          <b-dropdown-item
            v-if="action.type === 'action'"
            :disabled="
              ($nuxt.$loading && $nuxt.$loading.show) || action.disabled
            "
            @click="onActionClick(action, data)"
          >
            <div :class="`d-flex justify-content-between ${action.class}`">
              <b-icon :icon="action.icon" />
              {{ action.name }}
            </div>
          </b-dropdown-item>

          <b-dropdown-divider v-if="action.type === 'divider'" />
          <b-dropdown-header v-if="action.type === 'header'">
            {{ action.title }}
          </b-dropdown-header>
        </span>
      </b-dropdown>
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
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    busy: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    modelItems: [],
    modelFields: [],
    modelBusy: false,
    selectedItems: [],
    allSelected: false
  }),

  watch: {
    items (val) {
      this.modelItems = val;
    },
    busy (val) {
      this.modelBusy = val;
    }
  },

  mounted () {
    this.modelItems = this.items;
    this.modelFields = this.mixinFields(this.fields);
    this.modelBusy = this.busy;
  },

  methods: {
    onActionClick (action, item) {
      this.$emit('actionClick', action, item);
    },

    onBulkActionClick (action) {
      this.$emit('bulkActionClick', action, this.selectedItems);
    },

    onRowSelected (selected) {
      this.selectedItems = selected;
      this.allSelected = this.selectedItems.length === this.modelItems.length;
    },

    onSelectRow (evt, row) {
      if (evt) { this.$refs[`ref_${this.id}`].selectRow(row.index); } else { this.$refs[`ref_${this.id}`].unselectRow(row.index); }
    },

    onSelectAll (evt) {
      if (evt) { this.$refs[`ref_${this.id}`].selectAllRows(); } else { this.$refs[`ref_${this.id}`].clearSelected(); }
    },

    mixinFields (fields) {
      return [
        {
          key: 'check',
          label: ''
        },
        ...fields
      ];
    }
  }
};
</script>

<style>
</style>
