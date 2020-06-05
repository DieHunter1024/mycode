<template>
  <div class="shopPicker">
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker class="pickerItem" :slots="count" :showToolbar="true" @change="onValuesChange">
        <div>{{pickerTitle}}</div>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { Picker, Popup } from "mint-ui";
import Config from "../../config/config";
const { EventName } = Config;
export default {
  name: "shopPicker",
  props: ["ShopMaxCount","pickerTitle"],
  data() {
    return {
      popupVisible: false,
      count: [{ flex: 1, values: [] }]
    };
  },
  mounted() {
    this.createShopCount();
    this.$events.onEvent(EventName.ShowPicker, this.showPicker);
  },
  destroyed() {
    this.$events.offEvent(EventName.ShowPicker);
  },
  methods: {
    onValuesChange(comp, count) {
      this.$events.emitEvent(EventName.ChangeCount, count[0]);
    },
    showPicker() {
      this.popupVisible = true;
    },
    createShopCount() {
      this.count[0].values = this.ShopMaxCount;
      for (let i = 0; i < this.ShopMaxCount; i++) {
        this.count[0].values.push(i + 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";

</style>