<template>
  <div class="card-panel">
    <!-- Card  -->
    <div class="card-panel__column">
      <!-- Card Display -->
      <div class="card-display">
        <!-- Carousel Section -->
        <div class="card-display__cards">
          <div class="card-display__card"></div>
          <div class="card-display__card"></div>
          <div class="card-display__card"></div>
        </div>
        <!-- End of Carosuel Section -->
      </div>
      <!-- End of Card Display -->
    </div>
    <div class="card-panel__column"></div>
  </div>
</template>
<script>
export default {
  name: "CardView",
};
</script>
<style lang="scss">
/* Card Panel */
.card-panel {
  width: 100%;
  min-height: 100vh;
  background: $secondary-c;
}
/* Card Section */
.card-display {
  &__card {
    width: 358px;
    height: 220px;
  }
}
@include screen(desktop) {
  /* Card Panel */
  .card-panel {
    background: $white-c;
  }
}
</style>