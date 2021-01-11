
<template>
  <div class="w-100 d-flex justify-content-around align-items-start">
    <span class="flex-grow-1">{{ showing }}</span>
    <span class="mr-3">
      Show
      <b-form-select
        v-model="limit"
        :options="options"
        class="mx-1 w-auto"
        size="sm"
      />
      Entries
    </span>

    <b-pagination
      v-model="currentPage"
      :total-rows="$store.getters[`${id}/count`]"
      :per-page="$store.getters[`${id}/limit`]"
      :aria-controls="`${id}-list`"
      :disabled="$nuxt.$loading && $nuxt.$loading.show"
      hide-goto-end-buttons
      prev-text="Previous"
      next-text="Next"
      size="sm"
    >
      <template #page="{page, active}">
        <b
          v-if="active"
        >{{ page }}
        </b>
        <i v-else> {{ page }}
        </i>
      </template>
    </b-pagination>
  </div>
</template>

<style lang="scss">
@import "@/assets/style/modules/colors";

  .page-link {
    background-color: $color_secondary !important;
    border: 1px solid $color_primary !important;
    color: $white !important;
  }

</style>

<script>
export default {
  props: {
    id: { type: String, required: true }
  },
  data: () => ({
    options: [
      { value: 10, text: '10' },
      { value: 20, text: '20' },
      { value: 50, text: '50' },
      { value: 100, text: '100' }
    ]
  }),
  computed: {
    currentPage: {
      set (value) {
        this.$store.commit(this.id + '/currentPage', value);
        this.$store.dispatch(this.id + '/fetch');
      },
      get () {
        return this.$store.getters[this.id + '/currentPage'];
      }
    },
    limit: {
      set (value) {
        this.$store.commit(this.id + '/limit', value);
        this.$store.dispatch(this.id + '/fetch');
      },
      get () {
        return this.$store.getters[this.id + '/limit'];
      }
    },
    showing () {
      const perPage = this.$store.getters[this.id + '/limit'];
      console.log(`%c perpage = ${perPage}`, 'background-color:grey; padding:10px;');
      const totalRows = this.$store.getters[this.id + '/count'];
      console.log(`%c totalrows = ${totalRows}`, 'background-color:grey; padding:10px;');
      const currentPage = this.$store.getters[this.id + '/currentPage'];
      const from = totalRows ? ((currentPage - 1) * perPage) + 1 : 0;
      const to = currentPage * perPage <= totalRows ? currentPage * perPage : totalRows;
      return `Showing ${from} to ${to} of ${totalRows} Entries`;
    }
  }
};
</script>
