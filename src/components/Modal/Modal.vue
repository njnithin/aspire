<template :modalVisible="modalVisible">
  <div
    :class="{ 'aspire-modal--active': modalVisible }"
    class="aspire-modal"
    @click="modalClick"
  >
    <div
      class="aspire-modal__panel"
      :class="{ 'aspire-modal__panel--active': modalVisible }"
    >
      <div class="aspire-modal__panel-box">
        <h2 class="aspire-modal__title">
          <slot :modalVersion="modalVersion" name="header"> Modal Header</slot>
        </h2>
        <div class="aspire-modal__body">
          <slot name="body"></slot>
        </div>
        <div class="aspire-modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVersion: "1.0",
    };
  },
  name: "ModalView",
  props: {
    modalVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    modalClick(e) {
      if (e.target.classList.contains("aspire-modal")) {
        this.$emit("closeFromModal");
      }
    },
  },
};
</script>
<style  lang="scss">
.aspire-modal {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: -100%;
  z-index: 50;
  width: 100%;
  background: rgba(0, 0, 0, 0.45);
  transition: all 0.8s ease;
  margin: 0 auto;
  &--active {
    right: 0;
  }
  &__panel {
    &:not(.aspire-modal__panel--active) {
      transition: opacity 0.5s ease;
    }
    opacity: 0;
    &--active {
      opacity: 1;
    }
  }

  &__panel-box {
    position: relative;
    background: $white-c;
    max-width: 1000px;
    width: 100%;
    padding: 50px 40px 80px;
  }
  &__title {
    font-size: 22px;
    font-weight: 600;
    line-height: 26px;
    color: $secondary-c;
    margin-bottom: 20px;
  }
  &__body {
    font-size: 16px;
  }
}
@include screen(large-tablet) {
  .aspire-modal {
    &__panel-box {
      min-width: 544px;
    }
  }
}
</style>