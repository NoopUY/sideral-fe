
<template>
  <div id="pagination" class="w-100 px-4 py-3 d-flex justify-content-around align-items-center">
    <slot class="flex-grow-1" />

    <span class="flex-grow-1">{{ showing }}</span>

    <span class="mr-3">
      {{ $t('ResultsPerPage') }}:
      <b-form-select
        v-model="limit"
        :options="options"
        class="mx-1 w-auto"
        size="sm"
      />
    </span>

    <b-pagination
      v-model="currentPage"
      :total-rows="$store.getters[`${id}/count`]"
      :per-page="$store.getters[`${id}/limit`]"
      :aria-controls="`${id}-list`"
      :disabled="$nuxt.$loading && $nuxt.$loading.show"
      hide-goto-end-buttons
      :prev-text="$t('Previous')"
      :next-text="$t('Next')"
      size="sm"
      class="mb-0"
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
      const totalRows = this.$store.getters[this.id + '/count'];
      const currentPage = this.$store.getters[this.id + '/currentPage'];
      const from = totalRows ? ((currentPage - 1) * perPage) + 1 : 0;
      const to = currentPage * perPage <= totalRows ? currentPage * perPage : totalRows;
      return `${this.$t('Showing')} ${from} - ${to} ${this.$t('of')} ${totalRows} ${this.$t('results')}`;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/style/modules/colors";

  #pagination {
    background-color: #ffffff;
    height: 60px;
    color: darken($color_background, 40);
  }

  .page-link {
    background-color: #ffffff !important;
    border: 1px solid darken($color_background, 10) !important;
    color: $color_text_dark !important;
  }

</style>
