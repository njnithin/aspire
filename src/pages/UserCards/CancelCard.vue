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
      padding-left: 55px;
    }
    &__card-wrap--freeze .card-display__card-content {
      transform: scale(1);
      height: 100%;
      padding: 55px 0;
      width: 100%;
    }
  }
}
@include screen(desktop) {
  .card-preview {
    .card-display {
      &__card {
        max-width: 340px;
      }
    }
    .card-display__card-wrap--freeze {
      .card-display__card-content {
        transform: scale(0.8);
      }
    }
  }
}
</style>