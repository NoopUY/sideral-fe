<template>
  <div class="w-100">
    <page-header>
      <template #page-name>
        Batch #{{ batch.custom_id }}
      </template>

      <template #header-actions>
        <div>
          <b-button variant="white" class="button-header hide-mobile">
            <b-icon icon="printer-fill" /> print
          </b-button>
          <b-button variant="danger" class="button-header text-white">
            <b-icon icon="trash-fill" /> Delete
          </b-button>
        </div>
      </template>
    </page-header>

    <div class="d-flex justify-content-center">
      <b-form class="w-50">
        <form-field
          v-model="batch.custom_id"
          label="#Custom id"
          description="A custom id that makes sense to you...its just for you"
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
import { mapGetters } from 'vuex';

export default {

  data: () => {
    return {
      batch: {},
      editMode: false
    };
  },

  computed: {
    ...mapGetters({ find: 'batches/find' })
  },

  mounted () {
    this.batch = { ...this.find(this.$route.params.id) };
  }
};
</script>
