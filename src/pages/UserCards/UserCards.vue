<template>
  <div class="card-panel" v-cloak>
    <!-- Modal For the Page -->
    <Modal :modalVisible="modalVisible" @closeFromModal="close">
      <template #header>
        {{ modalTitle }}
      </template>
      <template #body>
        <AddNewCard
          :success="cardAdded"
          :addedCardName="addedCardName"
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
                  :class="[
                    {
                      'card-display__card-wrap--freeze':
                        cards[activeCard].freeze === true,
                    },
                    'card-display__card-wrap--type-' + cards[activeCard].type,
                  ]"
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
                    <!-- Top right logo -->
                    <div
                      class="
                        card-display__card-wrap-logo
                        card-display__card-wrap-logo--top
                      "
                    >
                      <img
                        :src="require('@/pages/UserCards/img/aspire-card.svg')"
                        alt="aspire-card"
                      />
                    </div>
                    <!-- End of top right logo -->
                    <!-- Bottom Right Logo -->
                    <div
                      class="
                        card-display__card-wrap-logo
                        card-display__card-wrap-logo--bottom
                      "
                    >
                      <img
                        v-if="cards[activeCard].type === 'visa'"
                        :src="require('@/pages/UserCards/img/visa.svg')"
                        alt="aspire-card"
                      />
                      <img
                        v-else-if="cards[activeCard].type === 'master'"
                        :src="require('@/pages/UserCards/img/master.svg')"
                        alt="aspire-card"
                      />
                    </div>
                    <!-- End of Bottom Right Logo -->
                  </div>
                </div>
              </div>
            </div>
          </template>
        </CancelCard>
        <div v-else>
          <div class="content-panel empty-feature">
            <img
              class="aspire-logo"
              src="@/components/AppMenu/img/aspire-logo.svg"
              alt="Aspire-Logo-Large"
            />
            <div class="aspire-desc">
              {{ modalTitle }} feature is not available for now.
            </div>
          </div>
        </div>
      </template>
    </Modal>
    <!-- Card Panel Header -->
    <div
      class="card-panel__header"
      :class="{
        'card-panel__header--inactive': activeTab > 0 || cards.length === 0,
      }"
    >
      <div
        class="card-panel__header-newcard"
        :class="{ 'card-panel__header-newcard--no-cards': cards.length === 0 }"
      >
        <div class="card-panel__header-title">
          <div class="card-panel__header-label">Account Balance</div>
          <div class="card-panel__header-amount">
            <span class="card-panel__amount-currency">S$</span>
            <span v-if="cards.length > 0">{{
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
          <div class="card-panel__column card-panel__column--left">
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
          <div
            class="card-panel__column card-panel__column--right"
            v-if="cards.length"
          >
            <div
              v-touch:swipe="cardDataSwipe"
              class="card-panel__data"
              :class="{
                'card-panel__data--active': cardDataActive,
                'card-panel__data--no-data':
                  cards[activeCard].cardDetails.data.length === 0 &&
                  cards[activeCard].recentTransactions.data.length === 0,
              }"
              v-touch-options="{ swipeTolerance: 100, touchHoldTolerance: 0 }"
            >
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
                  <div
                    class="card-settings__each-btn"
                    @click="cardOperation('set-limit')"
                  >
                    <div
                      class="
                        card-settings__btn-icon card-settings__btn-icon--limit
                      "
                    ></div>
                    <div class="card-settings__btn-label">Set Spend limit</div>
                  </div>
                  <!-- End of limit Card -->
                  <!--Gpay Card -->
                  <div
                    class="card-settings__each-btn"
                    @click="cardOperation('add-to-gpay')"
                  >
                    <div
                      class="
                        card-settings__btn-icon card-settings__btn-icon--gpay
                      "
                    ></div>
                    <div class="card-settings__btn-label">Add to Gpay</div>
                  </div>
                  <!-- End of Gpay Card -->
                  <!--Replace  Card -->
                  <div
                    class="card-settings__each-btn"
                    @click="cardOperation('replace-card')"
                  >
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
                <template
                  v-if="
                    cards[activeCard].cardDetails.data.length === 0 &&
                    cards[activeCard].recentTransactions.data.length === 0
                  "
                >
                  No Data Found
                </template>
                <template v-if="cards[activeCard].cardDetails.data.length">
                  <!-- Card Details -->
                  <div class="card-accordions__each-accordion">
                    <div
                      @click="
                        cards[activeCard].cardDetails.showContent =
                          !cards[activeCard].cardDetails.showContent
                      "
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
                    <div
                      class="card-accordions__content"
                      v-show="cards[activeCard].cardDetails.showContent"
                    >
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
                </template>
                <!-- Recent Tansactions Details -->
                <template
                  v-if="cards[activeCard].recentTransactions.data.length"
                >
                  <div class="card-accordions__each-accordion">
                    <div
                      @click="
                        cards[activeCard].recentTransactions.showContent =
                          !cards[activeCard].recentTransactions.showContent
                      "
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
                    <div
                      class="card-accordions__content"
                      v-show="cards[activeCard].recentTransactions.showContent"
                    >
                      <div class="card-accordions__each-content-wrap">
                        <div
                          class="card-accordions__each-content"
                          v-for="(info, index) in cards[activeCard]
                            .recentTransactions.data"
                          :key="index"
                        >
                          <!-- <pre v-html="info">info</pre> -->
                          <!-- Icon -->
                          <div class="card-accordions__each-content-icon">
                            <img
                              :src="
                                require('@/pages/UserCards/img/recent-transactions/' +
                                  info.icon +
                                  '.svg')
                              "
                              alt="transact icon"
                            />
                          </div>
                          <!-- End of Icon -->
                          <!-- Details -->
                          <div class="card-accordions__right-sec">
                            <div class="card-accordions__each-content-detail">
                              <div class="card-accordions__name">
                                <span class="card-accordions__name-field">{{
                                  info.name
                                }}</span>
                                <span
                                  v-if="info.type === 'credit'"
                                  class="card-accordions__type-field"
                                  :class="
                                    'card-accordions__type-field--' + info.type
                                  "
                                >
                                  +S$ {{ info.amount }}
                                </span>
                                <span
                                  v-else-if="info.type === 'debit'"
                                  class="card-accordions__type-field"
                                  :class="
                                    'card-accordions__type-field--' + info.type
                                  "
                                >
                                  -S$ {{ info.amount }}
                                </span>
                              </div>
                              <div class="card-accordions__date">
                                {{ info.date }}
                              </div>
                            </div>
                            <!-- Bottom Button -->
                            <div class="card-accordions__each-content-btm">
                              <span class="card-accordions__credit-card-icon"
                                ><img
                                  :src="
                                    require('@/pages/UserCards/img/recent-transactions/credit-card-small.svg')
                                  "
                                  alt=""
                              /></span>
                              <span
                                v-if="info.type === 'credit'"
                                class="card-accordions__each-content-label"
                              >
                                Refund on debit card
                              </span>
                              <span
                                v-if="info.type === 'debit'"
                                class="card-accordions__each-content-label"
                              >
                                Charged to debit card
                              </span>
                            </div>
                            <!-- End of Bottom Button -->
                          </div>
                          <!-- End of Details -->
                        </div>
                      </div>
                      <div class="card-accordions__view-all-wrap">
                        <a class="card-accordions__view-all"
                          >View all card transactions</a
                        >
                      </div>
                    </div>
                  </div>
                </template>
                <!-- End of Recent transactions -->
              </div>
              <!-- End of Card Accordion -->
            </div>
            <!-- Card Settings -->
          </div>
        </div>
      </template>
      <template #tab-panel-1>
        <div class="empty-tab">Feature not available...</div>
      </template>
    </AspireTabs>
  </div>
</template>
<script>
// import $ from "jquery";
import Vue from "vue";
import Vue2TouchEvents from "vue2-touch-events";

Vue.use(Vue2TouchEvents);
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
      modalVisible: false,
      modalTitle: "Add new card",
      modalPage: "add-card",
      cardDataActive: false,
      cardAdded: false,
      addedCardName: "",
      // cardName: "",
      cards: [
        {
          balanceAmount: 3000,
          type: "visa",
          name: "Mark Henry",
          cardNumber: "954419669610",
          showCardNumber: false,
          year: 2020,
          thru: "12/20",
          cvv: 621,
          cardIcon: "",
          freeze: false,
          cardDetails: {
            title: "Card details",
            showContent: false,
            data: [
              {
                title: "Nothing to display",
              },
            ],
          },
          recentTransactions: {
            title: "Recent Transactions",
            showContent: false,
            data: [
              {
                title: "a",
                icon: "refund",
                name: "Hamelys",
                date: "20 May 2020",
                type: "credit",
                amount: 150,
              },
              {
                title: "b",
                icon: "flight",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
              {
                title: "c",
                icon: "megaphone",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
              {
                title: "d",
                icon: "refund",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
            ],
          },
        },
        {
          balanceAmount: 4000,
          type: "master",
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
            showContent: false,
            data: [
              {
                title: "Nothing to display",
              },
            ],
          },
          recentTransactions: {
            title: "Recent Transactions",
            showContent: false,
            data: [
              {
                title: "a",
                icon: "refund",
                name: "Hamelys",
                date: "20 May 2020",
                type: "credit",
                amount: 150,
              },
              {
                title: "b",
                icon: "flight",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
              {
                title: "c",
                icon: "megaphone",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
              {
                title: "d",
                icon: "refund",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
            ],
          },
        },
        {
          balanceAmount: 5000,
          type: "visa",
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
            showContent: false,
            data: [
              {
                title: "Nothing to display",
              },
            ],
          },
          recentTransactions: {
            title: "Recent Transactions",
            showContent: false,
            data: [
              {
                title: "a",
                icon: "refund",
                name: "Hamelys",
                date: "20 May 2020",
                type: "credit",
                amount: 150,
              },
              {
                title: "b",
                icon: "flight",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
              {
                title: "c",
                icon: "megaphone",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
              {
                title: "d",
                icon: "refund",
                name: "Hamelys",
                date: "20 May 2020",
                type: "debit",
                amount: 150,
              },
            ],
          },
        },
      ],
      tabData: [
        {
          tabName: "My debit cards",
        },
        {
          tabName: "All company cards",
        },
      ],
    };
  },
  methods: {
    cardDataSwipe(direction) {
      if (direction == "top") {
        this.cardDataActive = true;
      } else if (direction == "bottom") {
        this.cardDataActive = false;
      }
    },
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
      } else if (operation == "add-card") {
        this.modalTitle = "Add new card";
      } else if (operation == "set-limit") {
        this.modalTitle = "Set spend limit";
      } else if (operation === "add-to-gpay") {
        this.modalTitle = "Add to Gpay";
      } else if (operation == "replace-card") {
        this.modalTitle = "Replace card";
      }
      this.modalPage = operation;
      this.openModal();
    },
    openModal() {
      this.modalVisible = true;
      document.querySelector("body").classList.add("no-scroll");
    },
    close() {
      this.modalVisible = false;
      document.querySelector("body").classList.remove("no-scroll");
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
        type: "visa",
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
          showContent: false,
          data: [],
        },
        recentTransactions: {
          title: "Recent Transactions",
          showContent: false,
          data: [],
        },
      });
      var vm = this;
      vm.cardAdded = true;
      vm.addedCardName = cardName;
      setTimeout(function () {
        vm.cardAdded = false;
      }, 1500);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss">
@import "@/pages/UserCards/style/user-cards.scss";
</style>