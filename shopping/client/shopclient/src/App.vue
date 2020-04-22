<template>
  <div id="app">
    <keep-alive include="Home,Kind">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
</style>
