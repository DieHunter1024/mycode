<template>
  <div class="shopPicker">
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-picker class="pickerItem" :slots="count" :showToolbar="true" @change="onValuesChange">
        <div>商品数量</div>
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
      for (let i = 0; i < Config.ShopMaxCount; i++) {
        this.count[0].values.push(i + 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.shopPicker {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  .h(500);
  .mint-popup {
    width: 100%;
    div {
      .padtop(15);
      text-align: center;
    }
  }
}
</style>