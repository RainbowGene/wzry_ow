<template>
  <!-- 卡片组件 -->
  <div>
    <div class="card bg-white p-3 mt-3">
      <div class="crad_header d-flex ai-center pb-3">
        <i class="iconfont fs-xm" :class="`icon-${icon}`"></i>
        <div class="fs-xxl flex-1 px-2">{{title}}</div>
        <div>···</div>
      </div>
      <div class="card_body my-1">
        <!-- 内容插槽 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
@import "@/assets/css/var.scss";
.card_body {
  .active {
    color: map-get($colors, "primary");
    border-bottom: 2px solid map-get($colors, "primary");
  }
}
.card {
  .crad_header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>