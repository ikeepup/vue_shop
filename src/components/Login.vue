<template>
  <div class="login-contanier">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form ref="loginForm" :model="loginInfo">
        <el-form-item>
          <el-input v-model="loginInfo.userName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginInfo.pwd"></el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="$router.push('/welcome')">提交</el-button>
            <el-button type="info">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInfo: {
        userName: 'admin',
        pwd: 1234
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-box {
  position: absolute;
  width: 450px;
  height: 304px;
  border-radius: 4px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar-box {
    position: absolute;
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    padding: 8px;
    box-shadow: 0 0 10px #eee;
    border-radius: 50%;
    background-color: #fff;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .el-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
