<template>
  <div class="add-card">
    <div>
      <label for="">Name</label>
      <input @keypress="cardNameTyping" v-model="cardName" type="text" />
    </div>
    <button @click="submitCard">Submit</button>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardName: "",
    };
  },
  name: "AddNewCard",
  methods: {
    cardNameTyping() {},
    submitCard() {
      this.$emit("addCard", {
        cardName: this.cardName,
      });
    },
    cardAdded() {
      console.log("card added");
    },
  },
};
</script>
<style>
</style>