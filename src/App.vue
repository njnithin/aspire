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
#app {
  display: flex;
  flex-wrap: wrap;
}
.page-content {
  width: 100%;
  min-height: 100vh;
  padding-top: 45px;
}
.aspire-buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 30px;
  .aspire-button:not(:last-child) {
    margin-right: 15px;
  }
}
.aspire-button {
  display: inline-block;
  font-size: 15px;
  line-height: 28px;
  min-height: 10px;
  min-width: 200px;
  margin-bottom: 10px;
  padding: 10px 0;
  border-radius: 100px;
  background-color: $primary-c;
  color: $white-c;
  text-align: center;
  cursor: pointer;
  &--danger {
    background-color: $danger;
  }
  &--null {
    cursor: pointer;
  }
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
    padding-left: 340px;
  }
}
</style>
