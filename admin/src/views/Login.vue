<template>
  <div class="login-container">
    <el-card header="登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密 码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const { data } = await this.$http.post("login", this.model);
      if (data.token) {
        // sessionStorage.token = data.token; // 浏览器关闭后清空token
        localStorage.token = data.token; //浏览器关闭后不清空token :localStorage.clear() 手动清空
        localStorage.username = data.username;
        this.$router.push("/");
        this.$message.success(`欢饮您,${data.username}`);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>