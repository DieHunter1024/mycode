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
  props: ["ShopMaxCount","pickerTitle"],//最大购买数，picker的标题
  data() {
    return {
      popupVisible: false,//是否显示组件
      count: [{ flex: 1, values: [] }]//组件默认模板
    };
  },
  mounted() {
    this.createShopCount();//初始化组件
    this.$events.onEvent(EventName.ShowPicker, this.showPicker);//监听显示picker事件
  },
  destroyed() {
    this.$events.offEvent(EventName.ShowPicker);//注销显示picker事件
  },
  methods: {
    onValuesChange(comp, count) {//数据变化时触发counter中的显示商品数量
      this.$events.emitEvent(EventName.ChangeCount, count[0]);
    },
    showPicker() {
      this.popupVisible = true;
    },
    createShopCount() {//根据传进来的最大数量显示商品数量列表
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