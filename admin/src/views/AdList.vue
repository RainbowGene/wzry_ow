<template>
  <div>
    <h3>广告列表</h3>
    <el-table :data="adList" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="广告名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adList: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/rest/ads");
      this.adList = res.data;
    },
    async remove(row) {
      this.$confirm("确认删除" + row.name + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`/rest/ads/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>