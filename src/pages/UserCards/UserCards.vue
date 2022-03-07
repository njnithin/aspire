<template>
  <div class="card-panel">
    <!-- Card  -->
    <div class="card-panel__column">
      <!-- Card Display -->
      <div class="card-display">
        <!-- Carousel Section -->
        <div class="card-display__cards">
          <div
            v-for="(card, index) in cardData.cards"
            :key="index"
            class="card-display__card"
          >
            <div
              class="card-display__card-strip"
              @click="card.showCardNumber = !card.showCardNumber"
            >
              <div v-if="card.showCardNumber === false">
                <img
                  class="card-display__card-strip-icon"
                  :src="require('@/pages/UserCards/img/eye.svg')"
                  alt="toggle-eye"
                />
                Show card number
              </div>
              <div v-else>
                <img
                  class="card-display__card-strip-icon"
                  :src="require('@/pages/UserCards/img/eye-disable.svg')"
                  alt="toggle-eye"
                />
                Hide card number
              </div>
            </div>
            <div class="card-display__card-wrap">
              <div class="card-display__card-content">
                <div class="card-display__card-name">{{ card.name }}</div>
                <div class="card-display__card-number-year">
                  <span
                    class="card-display__card-number"
                    :class="{
                      'card-display__card-number--show': card.showCardNumber,
                    }"
                  >
                    <span
                      class="card-display__card-circle"
                      :class="{
                        'card-display__card-circle-mul-4':
                          (index + 1) % 4 === 0,
                      }"
                      v-for="(eachDigit, index) in card.cardNumber"
                      :key="index"
                    >
                      <span class="card-display__card-digit">{{
                        card.cardNumber[index]
                      }}</span>
                    </span>
                  </span>
                  <span
                    class="card-display__card-date card-display__card-value"
                  >
                    {{ card.year }}
                  </span>
                </div>
                <div class="car-display__card-thru-cvv">
                  <span class="card-display__card-thru">
                    <span class="card-display__card-label">Thru: </span>
                    <span class="card-display__card-value"
                      >{{ card.thru }}
                    </span>
                  </span>
                  <span class="card-display__card-cvv">
                    <span class="card-display__card-label">CVV: </span>
                    <span class="card-display__card-value"
                      >{{ card.cvv }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Carosuel Section -->
      </div>
      <!-- End of Card Display -->
    </div>
    <div class="card-panel__column"></div>
  </div>
</template>

<script>
// import $ from "jquery";
export default {
  name: "CardView",
  data() {
    return {
      cardData: {
        cards: [
          {
            name: "Mark Henry",
            cardNumber: "954419669610",
            showCardNumber: false,
            year: 2020,
            thru: "12/20",
            cvv: 621,
            cardIcon: "",
          },
          {
            name: "Trang Bui",
            cardNumber: "996696105441",
            showCardNumber: false,
            year: 2021,
            thru: "12/23",
            cvv: 241,
            cardIcon: "",
          },
          {
            name: "Abel Teo",
            cardNumber: "441969569610",
            showCardNumber: false,
            year: 2022,
            thru: "01/2024",
            cvv: 621,
            cardIcon: "",
          },
        ],
      },
    };
  },
  mounted() {
    /*     $(".card-display__cards").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 5,
        },
      },
    }); */
  },
};
</script>
<style lang="scss">
@import "@/pages/UserCards/style/user-cards.scss";
</style>