<template>
  <b-container />
</template>

<script>

export default {

  mounted () {
    this.$auth.loginWith('auth0')
  }
}
</script>

<style lang="scss" scoped>

</style>
