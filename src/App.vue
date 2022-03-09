<template>
  <div id="app">
    <app-menu></app-menu>
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>
<script>
</script>

<style lang="scss">
@import "@/global/scss/base/font.scss"; // Font setting
@import "@/global/scss/base/reset.scss"; // Reset default css
#app {
  display: flex;
  flex-wrap: wrap;
}
.page-content {
  width: 100%;
  min-height: 100vh;
  padding-top: 44px;
}
@include screen(desktop) {
  .page-content {
    padding-left: 340px;
  }
}
</style>
