<template>
  <div class="d-flex justify-content-center align-items-start w-100 h-100">
    <div class="w-75">
      <PTable
        id="batches"
        :items="batchesData"
        :fields="fieldsDef"
        :busy="busy"
      />
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
            icon: 'pencil-square'
          },
          {
            type: 'divider',
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
            class: 'text-danger'
          }
        ]
      }))
    }
  },

  mounted () {
    this.fetchBatches();
  },

  methods: {
    ...mapActions({ fetchBatches: 'batches/fetch' })
  }
};
</script>
