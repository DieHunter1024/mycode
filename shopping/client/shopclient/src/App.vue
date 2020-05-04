<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="Home,Kind">
        <router-view class="appView"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "fade";
      }
    }
  }
};
</script>

<style>
</style>
