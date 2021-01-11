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
            action: 'batchView',
            icon: 'search'
          },
          {
            action: 'batchEdit',
            icon: 'pen'
          },
          {
            action: 'batchDelete',
            icon: 'trash'
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
