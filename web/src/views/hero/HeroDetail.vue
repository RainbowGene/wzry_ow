<template>
  <div class="page_hero" v-if="heroModel">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="@/assets/img/logo.png" height="30" alt />
      <div class="px-3 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white fs-xs ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div" class="text-white">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image':`url(${heroModel.banner})`}">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div>{{heroModel.title}}</div>
        <div class="my-2" style="font-size:1.5rem;">{{heroModel.name}}</div>
        <div v-if="heroModel.categories">{{heroModel.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between ai-center py-2">
          <div v-if="heroModel.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{heroModel.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-info-1">{{heroModel.scores.attack}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{heroModel.scores.skills}}</span>
            <span>生存</span>
            <span class="badge bg-grey">{{heroModel.scores.survive}}</span>
          </div>
          <router-link class="text-grey fs-sm" to="/home" tag="span">皮肤 &gt;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heroModel: {}
    };
  },
  props: {
    id: { required: true }
  },
  created() {
    this.getHeroList();
  },
  methods: {
    async getHeroList() {
      const res = await this.$http.get(`hero/${this.id}`);
      this.heroModel = res.data;
    }
  }
};
</script>
<style lang='scss' scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 9;
}

.page_hero {
  .top {
    height: 50vw;
    background-size: 100% auto;
    // background: #fff no-repeat top center;
    background-repeat: no-repeat;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

    .badge {
      margin: 0 0.25rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      border-radius: 50%;
      font-size: 0.8rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}
</style>