<template>
  <div class="w-100">
    <page-header>
      <template #page-name>
        Batch #{{ batch.custom_id }}
      </template>

      <template #header-actions>
        <div>
          <b-button variant="white" class="button-header hide-mobile" @click="onSave()">
            <b-icon icon="check2" /> Save
          </b-button>
          <b-button variant="white" class="button-header hide-mobile">
            <b-icon icon="printer-fill" /> Print
          </b-button>
          <b-button variant="danger" class="button-header text-white">
            <b-icon icon="trash-fill" /> Delete
          </b-button>
        </div>
      </template>
    </page-header>

    <div class="d-flex justify-content-center">
      <b-form class="w-50">
        <wizard
          v-model="batch.state"
          :steps="['fresh', 'primary', 'secondary', 'bottled']"
        />

        <form-field
          v-model="batch._id"
          label="ID"
          description="System ID, is automatically assigned and cannot be changed"
          :disabled="true"
          required
        />

        <form-field
          v-model="batch.custom_id"
          label="#Custom id"
          description="A custom id that makes sense to you. Mabye fermentation vessel id?"
          placeholder="Enter batch id"
          required
        />

        <form-field
          v-model="batch.blend"
          label="Blend"
          description="Cider blend eg: fuji40/gth60"
          placeholder="Enter blend"
          required
        />

        <form-field
          v-model="batch.description"
          label="Description"
          description="You can go wild here. Write notes, or whatever you need"
          placeholder="Enter description"
          required
          type="textarea"
        />

        <form-field
          v-model="batch.created_at"
          label="Created at"
          placeholder="Enter creation date"
          type="date"
        />

        <form-field
          v-model="batch.inoculated_at"
          label="Inoculated at"
          placeholder="Enter inoculation date"
          type="date"
        />

        <form-field
          v-model="batch.first_rack_at"
          label="First racked at"
          placeholder="Enter first rack date"
          type="date"
        />

        <tag-input v-model="batch.tags" />

        <sampling-input
          v-model="batch.density"
          label="Density"
          description="Density samples"
        />

        <sampling-input
          v-model="batch.ph"
          label="PH"
          description="PH samples"
        />
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {

  data: () => {
    return {
      batch: {},
      editMode: false,
      tag: '',
      pristine: true
    };
  },

  computed: {
    ...mapGetters({ find: 'batches/find' })
  },

  mounted () {
    this.batch = { ...this.find(this.$route.params.id) };
  },

  methods: {

    ...mapMutations({ update: 'batches/updateById' }),

    onSave () {
      this.update(this.batch);
      this.$router.push('/batches');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
