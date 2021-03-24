<template>
  <input type="text" @input="inputHandler" :value="value" />
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "inputComp",
  computed: {
    ...mapState({ value: "val" }),
  },
  methods: {
    ...mapMutations({ sendParams: "changeVal" }), // sendParams用来传递参数,先把sendParams注册到mutations上，输入时触发sendParams
    inputHandler(e) {
      this.sendParams(e.target.value);
    },
  },
};
</script>

<style
  scoped>
</style>
