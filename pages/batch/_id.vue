<template>
  <div class="w-100">
    <page-header back>
      <template #page-name>
        {{ $t("batch") }} #{{ batch.custom_id }}
      </template>

      <template #header-actions>
        <div>
          <b-button variant="white" class="button-header hide-mobile" @click="onSave()">
            <b-icon icon="check2" /> {{ $t("save") }}
          </b-button>
          <b-button variant="white" class="button-header hide-mobile">
            <b-icon icon="printer-fill" /> {{ $t("print") }}
          </b-button>
        </div>
      </template>
    </page-header>

    <div class="d-flex justify-content-center">
      <b-form class="w-50 mt-3">
        <!-- <wizard
          v-model="batch.state"
          :steps="[`${$t('fresh')}`, `${$t('primary')}`, `${$t('secondary')}`, `${$t('bottled')}`]"
        /> -->

        <b-tabs content-class="mt-3" class="flex-row">
          <b-tab :title="$t('BaseInfo')" active>
            <form-field
              v-model="batch.custom_id"
              label="field_batchCustomID"
              required
            />

            <form-field
              v-model="batch.state"
              label="field_batchState"
              type="select"
              :options="stateOptions"
              required
            />

            <form-field
              v-model="batch.blend"
              label="field_batchBlend"
              required
            />

            <form-field
              v-model="batch.liters"
              label="field_batchSize"
              required
            />

            <form-field
              v-model="batch.yeast"
              label="field_batchYeast"
            />

            <form-field
              v-model="batch.description"
              label="field_batchDescription"
              required
            />

            <form-field
              v-model="batch.observations"
              label="field_batchObservations"
              required
              type="textarea"
            />

            <tag-input v-model="batch.tags" />
          </b-tab>

          <b-tab :title="$t('Events')">
            <events-input
              v-model="batch.events"
              label="Events"
            />
          </b-tab>
        </b-tabs>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {

  async asyncData ($context) {
    const _id = $context.params.id;

    const data = {
      batch: {},
      mode: 'edit',
      stateOptions: [
        { text: $context.i18n.t('fresh'), value: 'fresh' },
        { text: $context.i18n.t('primary'), value: 'primary' },
        { text: $context.i18n.t('secondary'), value: 'secondary' },
        { text: $context.i18n.t('bottled'), value: 'bottled' }
      ]
    };

    if (_id === 'new') {
      data.mode = 'insert';
      data.batch = {
        created_at: Date.now(),
        state: 'fresh'
      }
    } else {
      data.batch = await $context.store.dispatch('batches/fetchById', _id);
    }

    return data;
  },
  data: () => {
    return {
      batch: {},
      editMode: false,
      tag: '',
      pristine: true,
      mode: 'edit'
    };
  },

  methods: {

    ...mapActions({
      update: 'batches/update',
      add: 'batches/add',
      get: 'batches/fetchById'
    }),

    onSave () {
      if (this.mode === 'insert') { this.add(this.batch); } else { this.update(this.batch); }
      this.$router.push('/batches');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
