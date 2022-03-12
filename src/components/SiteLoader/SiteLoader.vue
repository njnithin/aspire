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
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      enable-background="new 0 0 32 32"
      xml:space="preserve"
    >
      <circle fill="#01D167" cx="8.67" cy="16" r="1.92">
        <animate
          fill="remove"
          restart="always"
          calcMode="linear"
          additive="replace"
          accumulate="none"
          begin="0.1"
          repeatCount="indefinite"
          values="0;1;0"
          dur="1s"
          attributeName="opacity"
        ></animate>
      </circle>
      <circle fill="#01D167" cx="15.07" cy="16" r="1.92">
        <animate
          fill="remove"
          restart="always"
          calcMode="linear"
          additive="replace"
          accumulate="none"
          begin="0.2"
          repeatCount="indefinite"
          values="0;1;0"
          dur="1s"
          attributeName="opacity"
        ></animate>
      </circle>
      <circle fill="#01D167" cx="21.471" cy="16" r="1.92">
        <animate
          fill="remove"
          restart="always"
          calcMode="linear"
          additive="replace"
          accumulate="none"
          begin="0.3"
          repeatCount="indefinite"
          values="0;1;0"
          dur="1s"
          attributeName="opacity"
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