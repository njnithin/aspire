<template>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/card">Card</router-link>
    </nav>
</template>

<script>
export default {
  name: 'AppMenu',
  props: {
    msg: String
  }
}
</script>

<style  lang="scss">
</style>
