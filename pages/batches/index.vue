<template>
  <page>
    <template #page-content>
      <PTable
        id="batches"
        :items="batchesData"
        :fields="fieldsDef"
        :busy="busy"
        @actionClick="onActionClick"
        @bulkActionClick="onBulkActionClick"
      />
    </template>

    <template #header-actions>
      <div>
        <b-button variant="white" class="button-header">
          <b-icon icon="printer-fill" /> print
        </b-button>
        <b-button variant="white" class="button-header">
          export <b-icon icon="caret-down-fill" />
        </b-button>
        <b-button variant="accent" class="button-header button-add">
          <b-icon icon="plus" /> create new
        </b-button>
      </div>
    </template>
  </page>
</template>

<script>
import fieldsDef from '@/pages/batches/fields.js';
import { mapGetters, mapActions } from 'vuex';
import page from '@/layout/default';

export default {
  components: { page },
  layout: 'empty',
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

<style lang="scss">
  @import "@/assets/style/modules/_colors.scss";

  .button-header {
    border: 2px solid darken($color_background, 10);
    border-radius: 0.8em;
    padding: 5px 15px;
    text-transform: uppercase;
    font-size: 0.95em;
    font-weight: 700;
    color:$color_text_dark;;
  }

  .button-add {
    border: 2px solid darken($color_accent, 10);
  }

</style>
