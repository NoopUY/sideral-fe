
<template>
  <b-row>
    <b-col cols="12">
      <h3>Sign In</h3>
      <SignIn
        @login="$router.push({path: '/'})"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  layout: 'pre-auth'
}
</script>
