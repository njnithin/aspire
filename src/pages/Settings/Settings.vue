<template>
  <div class="home-page">
    <div class="content-panel" @click="contentPanel = !contentPanel">
      <div class="user-settings">
        <div
          class="outer-circle circle circle-1"
          :class="{ active: contentPanel }"
        >
          <span class="sq sq-1"></span>
          <span class="inner-circle circle">
            <img
              src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=73a9df4b7bd1b330db1e903e08575ec1"
            />
          </span>
          <span class="sq sq-2"></span>
        </div>
        <div class="user-settings__user-name">Mark Henry</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InterviewSettings",

  data() {
    return {
      contentPanel: false,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
/* Circle Settings */
.circle {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.outer-circle {
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 4px rgb(77, 77, 77, 0.46);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
}
.inner-circle {
  width: 90px;
  height: 90px;
  border: 3px solid #fff;
  box-shadow: 0px 0px 3px 2px #dddada inset;
  z-index: 1;
  overflow: hidden;
}
.inner-circle img {
  width: 90px;
  background-size: cover;
}
.sq {
  position: absolute;
  width: 50%;
  height: 120%;
  max-height: 0;
  background: rgb(242 92 5);
}
.outer-circle:hover .sq,
.outer-circle.active .sq {
  max-height: 130%;
}
/* Circle-1 Animation Settings */
.circle-1 .sq-1 {
  top: -5%;
  right: 0;
  transition: max-height 0.4s linear 0.3s;
}
.circle:hover .sq-1 {
  transition: max-height 0.4s linear 0s;
}
.circle-1 .sq-2 {
  bottom: -5%;
  left: 0;
  transition: max-height 0.4s linear 0s;
}
.circle:hover .sq-2 {
  transition: max-height 0.4s ease-out 0.3s;
}
/* End of Circle-1 Animation Settings */
.user-settings {
  &__user-name {
    font-weight: 700;
    font-size: 22px;
    letter-spacing: 0.53px;
    line-height: 20px;
    margin-bottom: 25px;
    color: $secondary-c;
  }
}
</style>