<template>
  <div>
    <h3>{{id?'编辑':'新建'}}物品</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="父级">
        <el-select v-model="model.parent">
          <el-option v-for="item in parent" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
          :before-upload="beforeAvatarUpload"
          :headers="getAuthHeader()"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  props: {
    id: {} // 接收id为编辑，否则为创建,好处在于尽可能解耦路由
  },
  methods: {
    // 查询分类详情
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data;
    },
    // 获取级联菜单
    // async fetchOption() {
    //   const res = await this.$http.get(`/rest/items`);
    //   this.parent = res.data;
    // },
    // 创建分类
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 图片上传
    afterUpload(res, file) {
      // 使用vue提供的显示赋值，因为我们上面只定义了 model:{} 响应式时Vue没有绑定icon，
      // 会导致我们赋值 icon 时不会引起数据更改，因为icon根本没有被监听
      this.$set(this.model, "icon", res.url);
      // this.model.icon = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    this.id && this.fetch();
    // this.fetchOption();
  }
};
</script>
<style lang='scss' scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>