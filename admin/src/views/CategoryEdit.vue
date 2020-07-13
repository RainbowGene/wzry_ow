<template>
  <div>
    <h3>{{id?'编辑分类':'新建分类'}}</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="父级">
        <el-select v-model="model.parent">
          <el-option v-for="item in parent" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      parent: [] // 下拉框选项
    };
  },
  props: {
    id: {} // 接收id为编辑，否则为创建,好处在于尽可能解耦路由
  },
  methods: {
    // 查询分类详情
    async fetch() {
      const res = await this.$http.get(`/rest/categories/${this.id}`);
      this.model = res.data;
    },
    // 获取级联菜单
    async fetchOption() {
      const res = await this.$http.get(`/rest/categories`);
      this.parent = res.data;
    },
    // 创建分类
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchOption();
  }
};
</script>
<style lang='scss' scoped>
</style>