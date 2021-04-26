
<template>
  <SignIn
    @login="$router.push({path: '/'})"
  />
</template>

<script>
export default {
  layout: 'pre-auth'
}
</script>
