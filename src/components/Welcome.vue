<template>
  <el-container>
    <el-header>
      <div class="login-box">
        <!-- <img src="" alt=""> -->
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="quit">退出</el-button>
    </el-header>
    <el-container>
      <el-aside ref="aside" :width="asideWidth">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <div class="toggle_bar" @click="toggle">|||</div>
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont icon-yonghu4"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-tijikongjian"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-shangpin"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-danju"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-baobiao"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    quit() {
      this.$confirm('确定退出?', '提示')
        .then(() => {
          sessionStorage.removeItem('token')
          this.$message.success('已退出')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message.info('退出取消')
        })
    },
    toggle() {
      this.isCollapse = !this.isCollapse
    }
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    asideWidth() {
      return this.isCollapse ? '65px' : '200px'
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background-color: #373d41;
    .login-box {
      display: flex;
      align-items: center;
      span {
        font-size: 22px;
        color: #fff;
      }
    }
  }
  .el-container {
    height: 100%;
    .el-aside {
      height: 100%;
      background-color: #333744;
      .el-menu {
        border-color: #333744;
        .toggle_bar {
          text-align: center;
          color: #fff;
          cursor: pointer;
          background-color: #4a5064;
          height: 25px;
          font-size: 12px;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
