<template>
  <div class="w-100">
    <page-header>
      <template #header-actions>
        <div>
          <b-button variant="white" class="button-header hide-mobile">
            <b-icon icon="printer-fill" /> print
          </b-button>
          <b-button variant="white" class="button-header hide-mobile">
            export <b-icon icon="caret-down-fill" />
          </b-button>
          <b-button variant="accent" class="button-header button-add" to="batch/new">
            <b-icon icon="plus" /> create new
          </b-button>
        </div>
      </template>
    </page-header>

    <div class="mx-4 py-3 d-flex align-items-center justify-content-start content-header">
      <Search id="batches" placeholder="Search by code or name..." />
    </div>

    <Pagination id="batches" class="hide-mobile" />

    <Table
      id="batches"
      :items="batchesData"
      :fields="fieldsDef"
      :busy="busy"
      @actionClick="onActionClick"
      @bulkActionClick="onBulkActionClick"
    />
  </div>
</template>

<script>
import fieldsDef from '@/pages/batches/fields.js';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import delayAction from '@/mixins/delayAction'

export default {
  mixins: [delayAction],

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
            action: 'batchView',
            name: 'View/Edit',
            icon: 'search',
            addToBulk: false
          },
          {
            type: 'action',
            action: 'batchDuplicate',
            name: 'Duplicate',
            icon: 'clipboard-plus',
            addToBulk: true
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
    ...mapActions({
      fetchBatches: 'batches/fetch',
      deleteBatch: 'batches/delete',
      addBatch: 'batches/add'
    }),

    ...mapMutations({
      softDeleteBatch: 'batches/delete'
    }),

    onActionClick (action, item) {
      switch (action.action) {
        case 'batchView':
          this.$router.push({ path: `batch/${item.item._id}` });
          break;

        case 'batchDelete':
          this.softDeleteBatch(item.item);

          this.delayAction({
            action: `Deleting batch ${item.item.custom_id}`,
            delay: 5000,
            exec: this.deleteBatch.bind(this, item.item),
            undo: this.fetchBatches.bind(this)
          })

          break;

        case 'batchDuplicate':
          // eslint-disable-next-line
          let dup = { ...item.item };
          delete dup._id;
          this.addBatch(dup);
          break;

        default:
          break;
      }
    },

    onBulkActionClick (action, items) {
      switch (action.action) {
        case 'batchDelete':

          for (const item of items) {
            this.softDeleteBatch(item);
          }

          this.delayAction({
            action: `Deleting ${items.length} batches`,
            delay: 5000,
            exec: () => {
              for (const item of items) {
                this.deleteBatch(item)
              }
            },
            undo: this.fetchBatches.bind(this)
          })

          break;

        case 'batchDuplicate':
          for (const item of items) {
            // eslint-disable-next-line
            let dup = { ...item };
            delete dup._id;
            this.addBatch(dup);
          }

          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss">
  @import "@/assets/style/modules/_colors.scss";
  @import "@/assets/style/modules/_media.scss";

  .button-header {
    border: 2px solid darken($color_background, 10);
    border-radius: 0.8em;
    padding: 5px 15px;
    text-transform: uppercase;
    font-size: 0.95em;
    font-weight: 700;
    color:$color_text_dark;
  }

  .button-add {
    border: 2px solid darken($color_accent, 10);

    @media #{$md-screen} {
      width: 90vw;
      padding: 10px 15px;
    }
  }

</style>
