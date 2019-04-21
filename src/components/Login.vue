<template>
  <div class="login-contanier" id="app">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form ref="loginForm" :model="loginInfo" :rules="loginRules">
        <el-form-item prop="username">
          <el-input v-model="loginInfo.username">
            <i slot="prefix" class="iconfont icon-yonghu"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginInfo.password">
            <i slot="prefix" class="iconfont icon-mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="15">
            <el-button type="primary" @click="login">提交</el-button>
            <el-button type="info" @click="reset">重置</el-button>
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
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' },
          { min: 3, max: 6, message: '长度 3~6 位', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const { data: dt } = await this.$http.post('/login', this.loginInfo)
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          this.$message.success(dt.meta.msg)
          sessionStorage.setItem('token', dt.data.token)
          this.$router.push('/welcome')
        }
      })
    },
    reset() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  background-color: #2b4b6b;
}
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
