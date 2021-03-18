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
      <b-form>
        <form-field
          v-model="batch.custom_id"
          label="#Custom id"
          description="A custom id that makes sense to you...its just for you"
          placeholder="Enter batch id"
          required
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
      batch: {}
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
