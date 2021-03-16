<template>
  <div>
    HOLA
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {

  data: () => {
    return {
    };
  },

  computed: {
    ...mapGetters({ batches: 'batches/data' })
  },

  mounted () {
    console.log(this.$route);
  },

  methods: {
    ...mapActions({ fetchBatches: 'batches/fetch' })
  }
};
</script>
