<template>
  <div class="card-panel">
    <!-- Modal For the Page -->
    <Modal :modalVisible="modalVisible" @closeFromModal="close">
      <template #header>
        {{ modalTitle }}
      </template>
      <template #body>
        <AddNewCard
          @addCard="insertCard"
          v-if="modalPage === 'add-card'"
        ></AddNewCard>
        <CancelCard
          @close="close"
          @cancelCard="cancelCard"
          v-else-if="modalPage === 'cancel-card'"
        >
          <template #card>
            <div v-html="activeCardHtml"></div>
          </template>
        </CancelCard>
      </template>
    </Modal>
    <!-- Card Panel Header -->
    <div class="card-panel__header">
      <div class="card-panel__header-newcard">
        <div class="card-panel__header-title">
          <div class="card-panel__header-label">Account Balance</div>
          <div class="card-panel__header-amount">
            <span class="card-panel__amount-currency">S$</span>
            <span>{{ fullCardData.accountBalance }}</span>
          </div>
        </div>
        <div class="add-btn" @click="cardOperation('add-card')">New Card</div>
      </div>
    </div>
    <!-- End of Card Panel Header -->
    <AspireTabs :tabData="tabData" :activeTab="0" class="card-panel__tabs">
      <template #tab-panel-0>
        <!-- End of Modal For the page -->
        <div class="card-panel__frame">
          <!-- Card  -->
          <div class="card-panel__column">
            <!-- Card Display -->
            <div class="card-display__cards">
              <!-- New Slider -->
              {{ activeCard }}
              <CardSlider
                :cards="cards"
                @carouselChanged="slideChange"
                @carouselInit="slideChange"
              >
              </CardSlider>
              <!-- End of New slider -->
            </div>
            <!-- End of Card Display -->
          </div>
          <div class="card-panel__column">
            <div class="card-panel__data card-panel__data--active">
              <div class="card-settings">
                <div class="card-settings__btn">
                  <!-- Freeze Button -->
                  <div
                    class="card-settings__each-btn"
                    @click="
                      cards[activeCard]['freeze'] = !cards[activeCard]['freeze']
                    "
                  >
                    <div
                      class="
                        card-settings__btn-icon card-settings__btn-icon--freeze
                      "
                    ></div>
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
                  <!-- Set limit Card -->
                  <div class="card-settings__each-btn">
                    <div
                      class="
                        card-settings__btn-icon card-settings__btn-icon--limit
                      "
                    ></div>
                    <div class="card-settings__btn-label">Set Spend limit</div>
                  </div>
                  <!-- End of limit Card -->
                  <!--Gpay Card -->
                  <div class="card-settings__each-btn">
                    <div
                      class="
                        card-settings__btn-icon card-settings__btn-icon--gpay
                      "
                    ></div>
                    <div class="card-settings__btn-label">Add to Gpay</div>
                  </div>
                  <!-- End of Gpay Card -->
                  <!--Replace  Card -->
                  <div class="card-settings__each-btn">
                    <div
                      class="
                        card-settings__btn-icon
                        card-settings__btn-icon--replace-card
                      "
                    ></div>
                    <div class="card-settings__btn-label">Replace Card</div>
                  </div>
                  <!-- End of Replace  Card -->
                  <!-- Cancel Card -->
                  <div
                    class="card-settings__each-btn"
                    @click="cardOperation('cancel-card')"
                  >
                    <div
                      class="
                        card-settings__btn-icon
                        card-settings__btn-icon--cancel-card
                      "
                    ></div>
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
                  <div
                    class="card-accordions__title"
                    :class="[
                      'card-accordions__title--' +
                        fullCardData.activeData.cardDetails.title
                          .toLowerCase()
                          .replace(' ', '-'),
                    ]"
                  >
                    {{ fullCardData.activeData.cardDetails.title }}
                    <span class="card-accordions__arrow"></span>
                  </div>
                  <div></div>
                  <div class="card-accordions__content">
                    <div
                      class="card-accordions__each-content"
                      v-for="(info, index) in fullCardData.activeData
                        .cardDetails.data"
                      :key="index"
                    >
                      {{ info.title }}
                    </div>
                  </div>
                </div>
                <!-- End of Card Details -->
                <!-- Card Details -->
                <div class="card-accordions__each-accordion">
                  <div
                    class="card-accordions__title"
                    :class="[
                      'card-accordions__title--' +
                        fullCardData.activeData.recentTransactions.title
                          .toLowerCase()
                          .replace(' ', '-'),
                    ]"
                  >
                    {{ fullCardData.activeData.recentTransactions.title }}
                    <span class="card-accordions__arrow"></span>
                  </div>
                  <div class="card-accordions__content">
                    <div
                      class="card-accordions__each-content"
                      v-for="(info, index) in fullCardData.activeData
                        .recentTransactions.data"
                      :key="index"
                    >
                      {{ info.title }}
                    </div>
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
// import $ from "jquery";
import Modal from "@/components/Modal/Modal.vue";
import CardSlider from "@/pages/UserCards/CardsSlider.vue";
import AddNewCard from "@/pages/UserCards/AddNewCard.vue";
import CancelCard from "@/pages/UserCards/CancelCard.vue";
import AspireTabs from "@/components/TabPanel/TabPanel.vue";

export default {
  name: "CardView",
  components: {
    CardSlider,
    Modal,
    AddNewCard,
    CancelCard,
    AspireTabs,
  },
  data() {
    return {
      activeCard: 0,
      activeCardStruct: "",
      cards: [
        {
          color: "green",
          name: "Mark Henry",
          cardNumber: "954419669610",
          showCardNumber: false,
          year: 2020,
          thru: "12/20",
          cvv: 621,
          cardIcon: "",
          freeze: true,
          cardDetails: {
            title: "Card details",
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
          color: "purple",
          name: "Trang Bui",
          cardNumber: "996696105441",
          showCardNumber: false,
          year: 2021,
          thru: "12/23",
          cvv: 241,
          cardIcon: "",
          freeze: false,
          cardDetails: {
            title: "Card details",
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
          color: "green",
          name: "Abel Teo",
          cardNumber: "441969569610",
          showCardNumber: false,
          year: 2022,
          thru: "01/2024",
          cvv: 621,
          cardIcon: "",
          freeze: false,
          cardDetails: {
            title: "Card details",
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
      modalVisible: false,
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
        accountBalance: 3000,
        activeCardIndex: 0,
        activeData: {},
        cards: [
          {
            color: "green",
            name: "Mark Henry",
            cardNumber: "954419669610",
            showCardNumber: false,
            year: 2020,
            thru: "12/20",
            cvv: 621,
            cardIcon: "",
            freeze: true,
            cardDetails: {
              title: "Card details",
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
            color: "purple",
            name: "Trang Bui",
            cardNumber: "996696105441",
            showCardNumber: false,
            year: 2021,
            thru: "12/23",
            cvv: 241,
            cardIcon: "",
            freeze: false,
            cardDetails: {
              title: "Card details",
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
            color: "green",
            name: "Abel Teo",
            cardNumber: "441969569610",
            showCardNumber: false,
            year: 2022,
            thru: "01/2024",
            cvv: 621,
            cardIcon: "",
            freeze: false,
            cardDetails: {
              title: "Card details",
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
  computed: {
    activeCardHtml() {
      return "<div>" + this.activeCardStruct + "</div>";
    },
  },
  methods: {
    slideChange({ activeCardIndex: index, activeCardStruct }) {
      var self = this;
      self.activeCard = index;
      self.activeCardStruct = activeCardStruct;
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
      this.$delete(this.cards, this.activeCard);
      if (this.cards.length) {
        this.activeCard = 0;
      }
      this.close();
    },
    /************   From Sand box  *********** */
    insertCard({ cardName }) {
      var currentDate = new Date(),
        expiryDate = new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        expiryYear = expiryDate.getFullYear(),
        expiryMonth = expiryDate.getDate();

      this.$set(this.cards, this.cards.length, {
        name: cardName,
        cardNumber: String(Math.floor(Math.random() * 1000000000000)),
        showCardNumber: false,
        year: currentDate.getFullYear(),
        thru: expiryMonth + "/" + expiryYear,
        issueDate: currentDate.toDateString(),
        expiryDate: expiryDate.toDateString(),
        cvv: Math.floor(Math.random() * (999 - 100)) + 100,
        cardIcon: "",
        freeze: false,
        cardDetails: {
          title: "Card details",
          data: [],
        },
        recentTransactions: {
          title: "Recent Transactions",
          data: [],
        },
      });
    },
  },
  created() {
    var self = this,
      cards = self.cards;
    if (cards.length) self.fullCardData.activeData = cards[0];
  },
  mounted() {},
};
</script>
<style lang="scss">
@import "@/pages/UserCards/style/user-cards.scss";
</style>