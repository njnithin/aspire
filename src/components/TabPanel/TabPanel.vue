<template :tabData="tabData" :activeTab="activeTab">
  <div class="aspire-tabpanel">
    <ul class="aspire-tabpanel__tabs">
      <li
        @click="tabClick(index)"
        v-for="(eachTab, index) in tabData"
        :key="index"
        class="aspire-tabpanel__tab-link-item"
        :class="{
          'aspire-tabpanel__tab-link-item--active': activeTabIndex === index,
        }"
      >
        <a
          :class="{
            'aspire-tabpanel__tab-link--active': activeTabIndex === index,
          }"
        >
          {{ eachTab.tabName }}
        </a>
      </li>
    </ul>
    <div class="aspire-tabpanel__content">
      <template v-for="(eachTab, index) in tabData">
        <div
          class="aspire-tabpanel__each-item"
          v-show="activeTabIndex === index"
          :key="index"
        >
          <slot :name="'tab-panel-' + index"> </slot>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeTabIndex: this.activeTab, // prop value
    };
  },
  props: {
    tabData: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: Number,
      required: true,
    },
  },
  methods: {
    tabClick(index) {
      this.activeTabIndex = index;
      this.$emit("tabChanged", index);
    },
  },
};
</script>
<style lang="scss">
.aspire-tabpanel {
  &__tabs {
    display: flex;
    flex-wrap: wrap;
    padding: 0 24px;
  }
  &__tab-link-item {
    position: relative;
    font-size: 13px;
    line-height: 20px;
    color: $white-c;
    opacity: 0.5;
    margin-right: 33px;
    padding-bottom: 5px;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      max-width: 0;
      background: $highlight-c;
      transition: max-width 0.5s ease;
    }
  }
  &__tab-link-item--active {
    font-weight: 700;
    opacity: 1;
    &::after {
      max-width: 100%;
    }
  }
  @include screen(large-tablet) {
    .aspire-tabpanel {
      &__tabs {
        padding: 0;
      }
      &__tab-link-item {
        color: $dark-c-2;
      }
    }
  }
}
</style>