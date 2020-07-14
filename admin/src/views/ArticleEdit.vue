<template>
  <div>
    <h3>{{id?'编辑':'新建'}}文章</h3>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor
          id="editor"
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 下载 npm i vue2-editor --save
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      model: {
        body: "此处输入"
      },
      categories: []
    };
  },
  components: {
    VueEditor
  },
  props: {
    id: {} // 接收id为编辑，否则为创建,好处在于尽可能解耦路由
  },
  created() {
    this.id && this.fetch();
    this.fetchCategory();
  },
  methods: {
    // 查询分类详情
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data;
    },
    // 查询级联
    async fetchCategory() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 创建分类
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 编辑器中的图片上传,编辑器中一定要有 id="editor"
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("file", file); // 定义字段名
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
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