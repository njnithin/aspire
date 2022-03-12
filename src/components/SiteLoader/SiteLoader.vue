<template>
  <!-- Site Loader -->
  <div class="site-loader" v-if="enableLoad">
    <svg
      version="1.1"
      id="L4"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enable-background="new 0 0 0 0"
      xml:space="preserve"
    >
      <circle fill="#01d167" stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        ></animate>
      </circle>
      <circle fill="#01d167" stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        ></animate>
      </circle>
      <circle fill="#01d167" stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        ></animate>
      </circle>
    </svg>
  </div>
  <!-- End of Site Loader -->
</template>
<script>
export default {
  props: {
    enableLoad: Boolean,
  },
};
</script>
<style lang="scss" scoped>
.site-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.site-loader svg {
  width: 150px;
  height: 150px;
}
</style>