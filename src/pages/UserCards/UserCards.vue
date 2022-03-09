<template>
  <div class="card-panel">
    <!-- Modal For the Page -->
    <Modal :modalVisible="modalVisible" @closeFromModal="close">
      <template #header>
        {{ modalTitle }}
      </template>
      <template #body>
        <AddNewCard
          @addCard="addCard"
          v-if="modalPage === 'add-card'"
        ></AddNewCard>
        <CancelCard
          @close="close"
          @cancelCard="cancelCard"
          v-else-if="modalPage === 'cancel-card'"
        ></CancelCard>
      </template>
    </Modal>
    <!-- Card Panel Header -->
    <div class="card-panel__header">
      <div class="card-panel__header-newcard">
        <div class="card-panel__header-title">Account Balance</div>
        <div class="add-btn" @click="cardOperation('add-card')">New Card</div>
      </div>
    </div>
    <!-- End of Card Panel Header -->
    <AspireTabs :tabData="tabData" :activeTab="0">
      <template #tab-panel-0>
        <!-- End of Modal For the page -->
        <div class="card-panel__frame">
          <!-- Card  -->
          <div class="card-panel__column">
            <!-- Card Display -->
            <div class="card-display__cards">
              <carousel
                :key="fullCardData.cards.length"
                :items="1"
                :loop="false"
                :center="true"
                :nav="false"
                :responsive="{
                  0: { items: 1, nav: false },
                  414: { items: 1, stagePadding: 20 },
                }"
                @changed="carouselChanged($event)"
              >
                <div
                  v-for="(card, index) in fullCardData.cards"
                  :key="index"
                  class="card-display__card"
                  :class="{
                    'card-display__card--freeze': card.freeze === true,
                  }"
                >
                  <div
                    class="card-display__card-strip"
                    @click="card.showCardNumber = !card.showCardNumber"
                    v-if="card.freeze === false"
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
                  <div
                    class="card-display__card-wrap"
                    :class="{
                      'card-display__card-wrap--freeze': card.freeze === true,
                    }"
                  >
                    <div class="card-display__card-content">
                      <div class="card-display__card-name">{{ card.name }}</div>
                      <div class="card-display__card-number-year">
                        <span
                          class="card-display__card-number"
                          :class="{
                            'card-display__card-number--show':
                              card.showCardNumber,
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
                          class="
                            card-display__card-date card-display__card-value
                          "
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
              </carousel>
            </div>
            <!-- End of Card Display -->
          </div>
          <div class="card-panel__column">
            <div class="card-panel__data">
              <div class="card-settings">
                <div class="card-settings__btn">
                  <!-- Freeze Button -->
                  <div
                    class="card-settings__each-btn"
                    @click="
                      fullCardData.activeData.freeze =
                        !fullCardData.activeData.freeze
                    "
                  >
                    <div class="card-settings__btn-icon"></div>
                    <div
                      v-if="fullCardData.activeData.freeze == false"
                      class="card-settings__btn-label"
                    >
                      Freeze card
                    </div>
                    <div v-else class="card-settings__btn-label">
                      Unfreeze card
                    </div>
                  </div>
                  <!-- End of Freeze button -->
                  <!-- Cancel Card -->
                  <div
                    class="card-settings__each-btn"
                    @click="cardOperation('cancel-card')"
                  >
                    <div class="card-settings__btn-icon"></div>
                    <div class="card-settings__btn-label">Cancel card</div>
                  </div>
                  <!-- End of Cancel Card -->
                </div>
              </div>
              <!-- End of Card Settings -->
              <!-- Card Accordion -->
              <div class="card-accordions">
                <!-- Card Details -->
                <div class="card-accordions__each-accordion">
                  <div class="card-accordions__title">
                    {{ fullCardData.activeData.cardDetails.title }}
                  </div>
                  <div
                    v-for="(info, index) in fullCardData.activeData.cardDetails
                      .data"
                    :key="index"
                  >
                    {{ info.title }}
                  </div>
                </div>
                <!-- End of Card Details -->
                <!-- Card Details -->
                <div class="card-accordions__each-accordion">
                  <div class="card-accordions__title">
                    {{ fullCardData.activeData.recentTransactions.title }}
                  </div>
                  <div
                    v-for="(info, index) in fullCardData.activeData
                      .recentTransactions.data"
                    :key="index"
                  >
                    {{ info.title }}
                  </div>
                </div>
                <!-- End of Card Details -->
              </div>
              <!-- End of Card Accordion -->
            </div>
            <!-- Card Settings -->
          </div>
        </div>
      </template>
      <template #tab-panel-1> No Data found for this tab </template>
    </AspireTabs>
  </div>
</template>
<script>
import $ from "jquery";
import carousel from "vue-owl-carousel";
import Modal from "@/components/Modal/Modal.vue";
import AddNewCard from "@/pages/UserCards/AddNewCard.vue";
import CancelCard from "@/pages/UserCards/CancelCard.vue";
import AspireTabs from "@/components/TabPanel/TabPanel.vue";

export default {
  name: "CardView",
  components: { carousel, Modal, AddNewCard, CancelCard, AspireTabs },
  data() {
    return {
      modalVisible: true,
      modalTitle: "Add new card",
      modalPage: "add-card",
      cardName: "",
      tabData: [
        {
          tabName: "My debit cards",
        },
        {
          tabName: "All company cards",
        },
      ],
      fullCardData: {
        activeCardIndex: 0,
        activeData: {},
        cards: [
          {
            name: "Mark Henry",
            cardNumber: "954419669610",
            showCardNumber: false,
            year: 2020,
            thru: "12/20",
            cvv: 621,
            cardIcon: "",
            freeze: true,
            cardDetails: {
              title: "Card Details",
              data: [
                {
                  title: "a",
                },
                {
                  title: "b",
                },
              ],
            },
            recentTransactions: {
              title: "Recent Transactions",
              data: [
                {
                  title: "a",
                },
                {
                  title: "b",
                },
              ],
            },
          },
          {
            name: "Trang Bui",
            cardNumber: "996696105441",
            showCardNumber: false,
            year: 2021,
            thru: "12/23",
            cvv: 241,
            cardIcon: "",
            freeze: false,
            cardDetails: {
              title: "Card Details",
              data: [
                {
                  title: "b",
                },
                {
                  title: "c",
                },
              ],
            },
            recentTransactions: {
              title: "Recent Transactions",
              data: [
                {
                  title: "c",
                },
                {
                  title: "d",
                },
              ],
            },
          },
          {
            name: "Abel Teo",
            cardNumber: "441969569610",
            showCardNumber: false,
            year: 2022,
            thru: "01/2024",
            cvv: 621,
            cardIcon: "",
            freeze: false,
            cardDetails: {
              title: "Card Details",
              data: [
                {
                  title: "d",
                },
                {
                  title: "e",
                },
              ],
            },
            recentTransactions: {
              title: "Recent Transactions",
              data: [
                {
                  title: "d",
                },
                {
                  title: "e",
                },
              ],
            },
          },
        ],
      },
    };
  },
  methods: {
    carouselChanged(e) {
      $(".test");
      var self = this;
      self.fullCardData.activeCardIndex = e.item.index;
      self.fullCardData.activeData =
        self.fullCardData.cards[self.fullCardData.activeCardIndex];
    },
    cardOperation(operation) {
      if (operation === "cancel-card") {
        this.modalTitle = "Cancel card";
        this.modalPage = "cancel-card";
      } else if (operation == "add-card") {
        this.modalTitle = "Add new card";
        this.modalPage = "add-card";
      }
      this.openModal();
    },
    openModal() {
      this.modalVisible = true;
    },
    close() {
      this.modalVisible = false;
    },
    cancelCard() {
      var cards = this.fullCardData.cards,
        activeCardIndex = this.fullCardData.activeCardIndex;
      this.fullCardData.cards = cards.filter(function (item, index) {
        if (index != activeCardIndex) {
          return item;
        }
      });
      if (this.fullCardData.cards.length) {
        this.fullCardData.activeCardIndex = 0;
        this.fullCardData.activeData =
          this.fullCardData.cards[this.fullCardData.activeCardIndex];
      }
      this.close();
    },
    addCard({ cardName }) {
      console.log(cardName);
      console.log(new Date().getFullYear());
    },
  },
  created() {
    var self = this,
      cards = self.fullCardData.cards;
    if (cards.length) self.fullCardData.activeData = cards[0];
  },
  mounted() {},
};
</script>
<style lang="scss">
@import "@/pages/UserCards/style/user-cards.scss";
</style>