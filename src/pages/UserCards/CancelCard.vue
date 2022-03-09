<template>
  <div class="cancel-card">
    <p>Are you sure want to cancel your card?</p>
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
<style>
</style>