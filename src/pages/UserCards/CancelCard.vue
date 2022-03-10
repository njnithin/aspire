<template>
  <div class="cancel-card">
    <p>Are you sure want to cancel your card?</p>
    <div class="card-preview">
      <slot name="card"> </slot>
    </div>
    <div class="aspire-buttons">
      <a
        class="aspire-button aspire-button--danger"
        @click="$emit('cancelCard', 'cancel-card')"
      >
        Yes
      </a>
      <a class="aspire-button--null" @click="$emit('close', 'cancel click')"
        >No</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CancelCard",
  methods: {},
};
</script>
<style  lang="scss">
.card-preview {
  * {
    color: $white-c;
  }
  .card-display {
    &__card {
      margin: 20px 0 30px;
    }
    &__card-wrap {
      transform: rotate(0);
      height: 212px;
    }
  }
}
</style>