<template :tabData="tabData" :activeTab="activeTab">
  <div class="aspire-tabpanel">
    <ul>
      <li
        @click="tabClick(index)"
        v-for="(eachTab, index) in tabData"
        :key="index"
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
    },
  },
};
</script>
<style lang="scss" scoped>
.aspire-tabpanel {
  &__tab-link--active {
    font-weight: 700;
  }
}
</style>