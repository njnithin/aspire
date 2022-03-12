<template>
  <div class="card-slider">
    <carousel
      v-show="cards.length"
      :items="1"
      :key="cards.length"
      :loop="false"
      :center="true"
      :nav="false"
      :responsive="{
        0: { items: 1, nav: false },
        414: { items: 1, stagePadding: 24 },
        960: { items: 1, stagePadding: 30 },
        1119: { items: 1, stagePadding: 0 },
      }"
      @changed="carouselChanged"
    >
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card-display__card"
        :class="[
          {
            'card-display__card--freeze': card.freeze === true,
          },
          'card-display__card--type-' + card.type,
        ]"
      >
        <!-- Top Strip -->
        <div
          class="card-display__card-strip"
          :class="{
            'card-display__card-strip--hide-card-no':
              card.showCardNumber === true,
          }"
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
        <!-- End of Top Strip -->
        <!-- Card Wrap -->
        <div
          class="card-display__card-wrap"
          :class="[
            {
              'card-display__card-wrap--freeze': card.freeze === true,
            },
            'card-display__card-wrap--type-' + card.type,
          ]"
        >
          <!-- Card Logos -->
          <!-- Top right logo -->
          <div
            class="
              card-display__card-wrap-logo card-display__card-wrap-logo--top
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
              card-display__card-wrap-logo card-display__card-wrap-logo--bottom
            "
          >
            <img
              v-if="card.type === 'visa'"
              :src="require('@/pages/UserCards/img/visa.svg')"
              alt="aspire-card"
            />
            <img
              v-else-if="card.type === 'master'"
              :src="require('@/pages/UserCards/img/master.svg')"
              alt="aspire-card"
            />
          </div>
          <!-- End of Bottom Right Logo -->
          <!-- End of Card Logos -->
          <!-- Card Center Content -->
          <div class="card-display__card-content">
            <!-- Card Name -->
            <div class="card-display__card-name">{{ card.name }}</div>
            <!-- End of Card Name -->
            <!-- Card Number -->
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
                    'card-display__card-circle-mul-4': (index + 1) % 4 === 0,
                  }"
                  v-for="(eachDigit, index) in card.cardNumber"
                  :key="index"
                >
                  <span class="card-display__card-digit">{{
                    card.cardNumber[index]
                  }}</span>
                </span>
              </span>
              <span class="card-display__card-date card-display__card-value">
                {{ card.year }}
              </span>
            </div>
            <!-- End of Card Number -->
            <!-- Thru and CVV -->
            <div class="car-display__card-thru-cvv">
              <span class="card-display__card-thru">
                <span class="card-display__card-label">Thru: </span>
                <span class="card-display__card-value">{{ card.thru }} </span>
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
          <!-- End of Card Center Content -->
        </div>
        <!-- End of Card Wrap -->
      </div>
    </carousel>
    <div class="card-slider__no-data" v-show="cards.length == 0">
      <div class="empty-tab">No cards found</div>
    </div>
  </div>
</template>
<script>
import Carousel from "vue-owl-carousel";
export default {
  data() {
    return {
      msg: "card",
    };
  },
  components: { Carousel },
  name: "HelloWorld",
  props: {
    cards: Array,
    activeCard: Number,
  },
  methods: {
    carouselChanged(e) {
      var self = this;
      setTimeout(function () {
        self.$emit("carouselChanged", {
          activeCardIndex: e.item.index,
        });
      }, 300);
    },
  },
  created() {},
  mounted() {
    var self = this;
    self.$emit("carouselInit");
  },
};
</script>
<style  lang="scss">
.card-display {
  &__cards {
    /* Owl Settings */
    .owl-dot {
      span {
        width: 8px;
        height: 8px;
        background: $primary-c !important; // overide owl
        opacity: 0.1;
      }
      &.active {
        span {
          width: 16px;
          opacity: 1;
        }
      }
    }
  }
  &__card {
    margin-top: 50px;
    position: relative;
    max-width: 358px;
    width: 100%;
    height: 220px;
    color: $white-c;
    margin: 50px auto 16px;
  }
  &__card-wrap {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-items: center;
    padding: 0 24px;
    border-radius: 12px;
    z-index: 1;
    width: 100%;
    background: $primary-c;
    box-shadow: 0 2px 6px 0 $shadow-c-1;
    transition: all 1s ease;
    &::after {
      content: "X";
      font-size: 24px;
      position: absolute;
      left: 25px;
      font-weight: 700;
      opacity: 0;
      transition: all 1s ease;
      color: red;
      top: 30px;
    }
    &--type-master {
      background: $state-c-2;
    }
    &--freeze {
      overflow: hidden;
      padding-left: 90px;
      opacity: 0.9;
      background: $dark-c-1;
      .card-display__card-content {
        transform: scale(0.7);
      }
      &::after {
        opacity: 1;
      }
    }
  }
  &__card-wrap-logo {
    position: absolute;
    right: 24px;
    &--top {
      top: 24px;
    }
    &--bottom {
      bottom: 24px;
    }
  }
  &__card-strip {
    position: absolute;
    top: -30px;
    right: 0;
    background: $white-c;
    min-height: 40px;
    border-radius: 6px 6px 0 0;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    color: $primary-c;
    padding: 5px 10px 0 32px;
    cursor: pointer;
    &--hide-card-no {
      color: $dark-c-1;
    }
  }
  &__card-strip-icon {
    position: absolute;
    left: 10px;
    top: 8px;
    width: auto !important; // override owll
  }
  &__card-number-year {
    margin-bottom: 20px;
  }
  &__card-number {
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    display: inline-flex;
    align-items: center;
    align-content: center;
    &--show {
      .card-display__card-circle {
        background: transparent;
      }
      .card-display__card-digit {
        opacity: 1;
        width: 100%;
      }
    }
  }
  &__card-circle {
    width: 8px;
    height: 8px;
    background: #fff;
    margin-right: 3.5px;
    display: inline-flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
  }
  &__card-circle-mul-4 {
    margin-right: 24px;
  }
  &__card-digit {
    opacity: 0;
    width: 0;
    transition: all 0.4s ease;
  }
  &__card-name {
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 0.53px;
    line-height: 20px;
    margin-bottom: 25px;
    text-transform: capitalize;
  }
  &__card-cvv {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__card-thru {
    margin-right: 30px;
  }
  &__card-label {
    font-size: 13px;
    letter-spacing: 1.56px;
    font-weight: 700;
  }
  &__card-value {
    font-weight: 700;
    font-size: 13px;
  }
  &__card-star {
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 2.88px;
    line-height: 24px;
    margin: 8px 5px 0;
  }
}
@include screen(tablet) {
  .card-display {
    &__card-wrap {
      &--freeze {
        transform: rotate(6deg);
      }
    }
  }
}
@include screen(desktop) {
  .card-display {
    &__card-wrap {
      &--freeze {
        transform: scale(0.87) rotate(6deg);
      }
    }
  }
}
</style>
