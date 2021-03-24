<template>
  <div>
    <inputComp></inputComp>
    <divComp></divComp>
  </div>
</template>

<script>
import inputComp
  from "./components/inputComp";
import divComp
  from "./components/divComp";

export default {
  name: 'App',
  components: {
    inputComp,
    divComp
  }
}
</script>

<style>

</style>
