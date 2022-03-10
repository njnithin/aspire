<template>
  <div class="add-card">
    <div>
      <label for="">Name</label>
      <input @keypress="cardNameTyping" v-model="cardName" type="text" />
    </div>
    <button @click="submitCard">Submit</button>
    <!--     <div class="test">
      <div v-for="(item, index) in testData" :key="index">
        {{ item }}
      </div>
      <button class="add-btn" @click="testData.push({ name: 'new user' })">
        Add Btn
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardName: "",
      testData: [{ name: "nithin" }, { name: "bibin" }],
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