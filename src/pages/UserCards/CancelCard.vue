<template>
  <div class="cancel-card">
    <p>Are you sure want to cancel your card?</p>
    <div class="card-preview">
      <slot name="card"> </slot>
    </div>
    <button @click="$emit('cancelCard', 'cancel-card')">Yes</button>
    <button @click="$emit('close', 'cancel click')">No</button>
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
      margin: 15px 0;
    }
    &__card-strip {
      display: none;
    }
    &__card-wrap {
      transform: rotate(0);
      height: 212px;
    }
    &__card-number--show {
      .card-display__card-circle {
        background: #fff;
      }
      .card-display__card-digit {
        opacity: 0;
      }
    }
  }
}
</style>