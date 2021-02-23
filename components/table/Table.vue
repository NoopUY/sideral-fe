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
    :busy="busy"
    select-mode="range"
    :selectable="true"
    responsive
    @row-selected="onRowSelected"
  >

    <template #head(check)>
      <b-form-checkbox @change="onSelectAll" :checked="allSelected"/>
    </template>

    <template #table-busy>
      <div class="text-center my-2">
        <b-spinner class="align-middle mr-2" />
        <strong>Loading...</strong>
      </div>
    </template>

    <template #cell(check)="data">
      <b-form-checkbox :checked="data.rowSelected" @change="onSelectRow($event, data)"/>
    </template>

    <template #cell(tags)="data">
      <b-badge v-for="tag in data.value" :key="tag" class="ml-1" :variant="tag.variant || 'info'">
        {{ tag }}
      </b-badge>
    </template>

    <template #cell(actions)="data">
       <b-dropdown variant="clear" no-caret>
        <template #button-content>
          <b-icon icon="three-dots-vertical" class="text-white"/>
        </template>

        <span
        v-for="action in data.value"
        :key="action.action"
        >
        <b-dropdown-item 
          v-if="action.type === 'action'"
          :disabled="($nuxt.$loading && $nuxt.$loading.show) || action.disabled"
        >
          <span :class="`w-100 d-flex justify-content-between align-items-center ${action.class}`">
          <b-icon :icon="action.icon" />
          {{ action.name }}
        </span>
        </b-dropdown-item>

        <b-dropdown-divider v-if="action.type === 'divider'" />
        <b-dropdown-header v-if="action.type ==='header'">
          {{action.title}}
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
    modelFields: [],
    selectedFields: [],
    allSelected: false
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
    this.modelFields = this.mixinFields(this.fields);
  },

  methods: {
    onActionClick (action, item) {
      this.$emit('onActionClick', action, item);
    },

    onRowSelected (selected) {
      this.selectedFields = selected;
      this.allSelected = this.selectedFields.length === this.modelItems.length;
    },

    onSelectRow(evt, row) {
      if (evt) this.$refs[`ref_${this.id}`].selectRow(row.index);
      else this.$refs[`ref_${this.id}`].unselectRow(row.index);
    },

    onSelectAll(evt) {
      if (evt) this.$refs[`ref_${this.id}`].selectAllRows();
      else this.$refs[`ref_${this.id}`].clearSelected();
    },

    mixinFields(fields) {
      return [
        {
          key: 'check',
          label: ''
        },
        ...fields
      ]
    }
  }
}
</script>

<style>

</style>
