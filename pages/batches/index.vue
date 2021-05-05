<template>
  <div class="w-100">
    <page-header>
      <template #header-actions>
        <div>
          <b-button variant="white" class="button-header hide-mobile">
            <b-icon icon="printer-fill" /> {{ $t('print') }}
          </b-button>
          <b-button variant="white" class="button-header hide-mobile">
            {{ $t('export') }} <b-icon icon="caret-down-fill" />
          </b-button>
          <b-button variant="accent" class="button-header button-add" to="batch/new">
            <b-icon icon="plus" /> {{ $t('createNew') }}
          </b-button>
        </div>
      </template>
    </page-header>

    <div class="mx-4 py-3 d-flex align-items-center justify-content-start content-header">
      <Search id="batches" :placeholder="`${$t('SearchByCodeOrName')}...`" />
    </div>

    <Table
      id="batches"
      :items="batchesData"
      :fields="fields"
      :busy="busy"
      @actionClick="onActionClick"
      @bulkActionClick="onBulkActionClick"
      @rowClick="onRowClick"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import delayAction from '@/mixins/delayAction';
import moment from 'moment';

export default {
  mixins: [delayAction],

  data: (vm) => {
    return {
      fields: [
        { key: 'custom_id', label: '#Id', thClass: 't-header', sortable: true },
        {
          key: 'created_at',
          label: vm.$t('created'),
          formatter (value) {
            return value ? moment(value).fromNow() : '--'
          },
          sortable: true,
          tdClass: 'batch-td-hide-mobile',
          thClass: 't-header'
        },
        {
          key: 'description',
          label: vm.$t('description'),
          thClass: 't-header'
        },
        {
          key: 'blend',
          label: vm.$t('blend'),
          thClass: 't-header'
        },
        {
          key: 'yeast',
          label: vm.$t('yeast'),
          thClass: 't-header'
        },
        {
          key: 'liters',
          label: vm.$t('liters'),
          thClass: 't-header'
        },
        {
          key: 'state',
          label: vm.$t('state'),
          thClass: 't-header'
        },
        {
          key: 'tags',
          label: vm.$t('tags'),
          tdClass: 'batch-td-hide-mobile',
          thClass: 't-header'
        },
        {
          key: 'actions',
          label: vm.$t('actions'),
          width: '135px',
          thClass: 't-header'
        }
      ],
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
            action: 'batchDuplicate',
            name: `${this.$t('Duplicate')}`,
            icon: 'clipboard-plus',
            addToBulk: true
          },
          {
            type: 'divider'
          },
          {
            type: 'action',
            action: 'batchDelete',
            name: `${this.$t('Delete')}`,
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

    onRowClick (item) {
      this.$router.push({ path: `batch/${item._id}` });
    },

    onActionClick (action, item) {
      switch (action.action) {
        case 'batchDelete':
          this.softDeleteBatch(item.item);

          this.delayAction({
            action: `${this.$t('Deleting')} batch ${item.item.custom_id}`,
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
  .button-add {
    border: 2px solid darken($color_accent, 10);

    @media #{$md-screen} {
      width: 90vw;
      padding: 10px 15px;
    }
  }

</style>
