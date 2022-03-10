<template>
  <div class="add-card">
    <div class="aspire-form-item">
      <label class="aspire-label" for="">Full Name</label>
      <div
        class="aspire-input-field"
        :class="{
          error: !/^[a-zA-Z]+ [a-zA-Z]+$/.test(cardName),
          'typed-once': typedOnce,
        }"
      >
        <input
          class="aspire-input"
          @keypress="typedOnce = true"
          @keyup.enter="submitCard"
          v-model="cardName"
          type="text"
          ref="fullName"
        />
        <div class="aspire-input-line"></div>
      </div>
      <div class="aspire-example">Eg: John Doe</div>
    </div>
    <div class="aspire-buttons">
      <a class="aspire-button" @click="submitCard">Submit</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardName: "",
      typedOnce: false,
      testData: [{ name: "nithin" }, { name: "bibin" }],
      formFields: {},
    };
  },
  name: "AddNewCard",
  methods: {
    validate(validateType, testString) {
      var regrex = {
        nameInput: /^[a-zA-Z]+ [a-zA-Z]+$/,
      };
      if (validateType === "nameInput")
        return regrex[validateType].test(testString);
    },
    submitCard() {
      var self = this,
        cardName = self.cardName,
        validate = this.validate("nameInput", cardName);
      if (validate) {
        self.$emit("addCard", {
          cardName: self.cardName,
        });
      } else {
        this.shakePanel();
        console.log("Please ente a valid name");
        this.$refs.fullName.focus();
      }
    },
    shakePanel() {
      var panelBox = document.querySelector(".aspire-modal__panel-box");
      panelBox.classList.add("shake");
      setTimeout(function () {
        panelBox.classList.remove("shake");
      }, 1500);
    },
    cardAdded(status) {
      console.log("card added", status);
    },
  },
};
</script>
<style scoped lang="scss">
.add-card {
  margin-top: 50px;
}
</style>