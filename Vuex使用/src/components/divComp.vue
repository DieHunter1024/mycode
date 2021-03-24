<template>
  <div>
    <button @click="clickHandler">清除</button>
    <span>{{ value + valueLength }}</span>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "divComp",
  computed: {
    ...mapState({ value: "val" }),
    ...mapGetters({ valueLength: "getValueLength" }),
  },
  methods: {
    ...mapActions({ clickHandler: "actionClearVal" }),
  },
};
</script>

<style
  scoped>
</style>
