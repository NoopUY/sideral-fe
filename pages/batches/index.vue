<template>
  <div class="d-flex justify-content-center align-items-start w-100 h-100">
    <div class="w-75">
      <PTable
        id="batches"
        :items="batchesData"
        :fields="fieldsDef"
        :busy="busy"
        @actionClick="onActionClick"
        @bulkActionClick="onBulkActionClick"
      >
        <template #actions>
          <div class="ml-3">
            <b-button variant="light" class="btn-circle btn-md">
              <b-icon icon="plus" scale="1.5" />
            </b-button>
          </div>
        </template>
      </PTable>
    </div>
  </div>
</template>

<script>
import fieldsDef from '@/pages/batches/fields.js';
import { mapGetters, mapActions } from 'vuex';

export default {

  data: () => {
    return {
      fieldsDef,
      busy: false
    };
  },

  computed: {
    ...mapGetters({ batches: 'batches/data' }),
    batchesData () {
      return this.batches.map(b => ({
        ...b,
        actions: [
          {
            type: 'action',
            action: 'batchEdit',
            name: 'Edit',
            icon: 'pencil-square',
            addToBulk: false
          },
          {
            type: 'divider'
          },
          {
            type: 'header',
            title: 'Danger Zone'
          },
          {
            type: 'action',
            action: 'batchDelete',
            name: 'Delete',
            icon: 'trash',
            class: 'text-danger',
            addToBulk: true
          }
        ]
      }))
    }
  },

  mounted () {
    this.fetchBatches();
  },

  methods: {
    ...mapActions({ fetchBatches: 'batches/fetch' }),

    onActionClick (action, item) {
      if (action.action === 'batchEdit') {
        this.$router.push({ path: `batch/${item.item._id}` });
      }
    },

    onBulkActionClick (action, items) {
      console.log(action);
      console.log(items);
    }
  }
};
</script>
