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
@import "@/global/scss/base/animations.scss"; // Animations used
@import "@/global/scss/base/default.scss"; // default styles
@import "@/global/scss/elements/buttons.scss"; // buttons
#app {
  display: flex;
  flex-wrap: wrap;
}
[v-cloak] {
  display: none;
}
.page-content {
  width: 100%;
  min-height: 100vh;
  padding-top: 45px;
}
.content-panel {
  display: flex;
  flex-wrap: wrap;
  @include flex-c-c;
  align-content: center;
  min-height: 300px;
  margin: 24px;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid $light-c-4;
}
.aspire-form-item {
  margin: 15px 0;
}
.aspire-label {
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: $secondary-c;
  margin-bottom: 10px;
}

.aspire-input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid $light-c-1;
  padding: 0 0 10px;
  font-size: 16px;
  line-height: 22px;
}

.aspire-input-field {
  position: relative;
  padding-bottom: 2px;
}
.aspire-input-line {
  width: 100%;
  height: 2px;
  left: 0;
  background: $primary-c;
  position: absolute;
  bottom: 1px;
  width: 0;
  transition: width 0.7s cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
.aspire-example {
  font-size: 14px;
  margin-top: 5px;
  color: $light-c-1;
}
.error.typed-once {
  .aspire-input-line {
    background: $danger;
  }
}
.aspire-input:focus {
  & + .aspire-input-line {
    width: 100%;
  }
}
.aspire-input,
.aspire-input:focus,
.aspire-input:active {
  box-shadow: none;
  outline: 0;
}

@include screen(large-tablet) {
  .page-content {
    padding-left: 360px;
    padding-right: 20px;
  }
}

@include screen(desktop) {
  .page-content {
    padding: 60px 60px 90px 400px;
    max-width: 1500px;
    margin: 0 auto;
    min-height: auto;
  }
}
</style>
