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
            <div v-if="cards.length">
              <div class="card-display__card">
                <div
                  class="card-display__card-wrap"
                  :class="{
                    'card-display__card-wrap--freeze':
                      cards[activeCard].freeze === true,
                  }"
                >
                  <div class="card-display__card-content">
                    <!-- Card Name -->
                    <div class="card-display__card-name">
                      {{ cards[activeCard].name }}
                    </div>
                    <!-- End of Card Name -->
                    <!-- Thru and CVV -->
                    <div class="car-display__card-thru-cvv">
                      <span class="card-display__card-thru">
                        <span class="card-display__card-label">Thru: </span>
                        <span class="card-display__card-value"
                          >{{ cards[activeCard].thru }}
                        </span>
                      </span>
                      <span class="card-display__card-cvv">
                        <span class="card-display__card-label">CVV: </span>
                        <span class="card-display__card-star">
                          ***
                          <!-- {{ card.cvv }} -->
                        </span>
                      </span>
                    </div>
                    <!-- End of Thru and CVV -->
                  </div>
                </div>
              </div>
            </div>
          </template>
        </CancelCard>
      </template>
    </Modal>
    <!-- Card Panel Header -->
    <div class="card-panel__header" v-show="activeTab === 0">
      <div
        class="card-panel__header-newcard"
        :class="{ 'card-panel__header-newcard--no-cards': cards.length === 0 }"
      >
        <div v-if="cards.length" class="card-panel__header-title">
          <div class="card-panel__header-label">Account Balance</div>
          <div class="card-panel__header-amount">
            <span class="card-panel__amount-currency">S$</span>
            <span>{{
              thousandSeperator(cards[activeCard]["balanceAmount"])
            }}</span>
          </div>
        </div>
        <div class="add-btn" @click="cardOperation('add-card')">New Card</div>
      </div>
    </div>
    <!-- End of Card Panel Header -->
    <AspireTabs
      :tabData="tabData"
      :activeTab="activeTab"
      class="card-panel__tabs"
      @tabChanged="tabChanged"
    >
      <template #tab-panel-0>
        <!-- End of Modal For the page -->
        <div class="card-panel__frame">
          <!-- Cards  -->
          <div class="card-panel__column">
            <!-- Card Display -->
            <div class="card-display__cards">
              <!-- New Slider -->
              <CardSlider
                :cards="cards"
                @carouselChanged="slideChange"
                @carouselInit="carouselCreated"
              >
              </CardSlider>
              <!-- End of New slider -->
            </div>
            <!-- End of Card Display -->
          </div>
          <div class="card-panel__column" v-if="cards.length">
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
                      v-if="cards[activeCard]['freeze'] == false"
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
                        cards[activeCard].cardDetails.title
                          .toLowerCase()
                          .replace(' ', '-'),
                    ]"
                  >
                    {{ cards[activeCard].cardDetails.title }}
                    <span class="card-accordions__arrow"></span>
                  </div>
                  <div></div>
                  <div class="card-accordions__content">
                    <div
                      class="card-accordions__each-content"
                      v-for="(info, index) in cards[activeCard].cardDetails
                        .data"
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
                        cards[activeCard].recentTransactions.title
                          .toLowerCase()
                          .replace(' ', '-'),
                    ]"
                  >
                    {{ cards[activeCard].recentTransactions.title }}
                    <span class="card-accordions__arrow"></span>
                  </div>
                  <div class="card-accordions__content">
                    <div
                      class="card-accordions__each-content"
                      v-for="(info, index) in cards[activeCard]
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
      <template #tab-panel-1>
        <div class="empty-tab">Coming Soon...</div>
      </template>
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
      activeTab: 0,
      activeCard: 0,
      activeCardStruct: "",
      cards: [
        {
          balanceAmount: 3000,
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
          balanceAmount: 4000,
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
          balanceAmount: 5000,
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
      },
    };
  },
  methods: {
    thousandSeperator(num) {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    },
    carouselCreated() {
      // debugger; // eslint-disable-line no-debugger
    },
    slideChange({ activeCardIndex: index }) {
      var self = this;
      self.activeCard = index;
    },
    tabChanged(tabValue) {
      this.activeTab = tabValue;
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
        balanceAmount: 0,
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
      return true;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
@import "@/pages/UserCards/style/user-cards.scss";
</style>