<template>
  <el-container>
    <el-header>
      <div class="login-box">
        <img src="../assets/img/avatar.png" alt>
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
          :router="true"
        >
          <div class="toggle_bar" @click="isCollapse=!isCollapse">|||</div>
          <el-submenu :index="menu.id+''" v-for="(menu,i) in menuList" :key="menu.id">
            <template slot="title">
              <i :class="['iconfont', iconList[i]]"></i>
              <span>{{menu.authName}}</span>
            </template>
            <el-menu-item v-for="submenu in menu.children" :index="submenu.path" :key="submenu.id">
              <i class="el-icon-menu"></i>
              <span>{{submenu.authName}}</span>
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
  created() {
    this.$http
      .get('/menus')
      .then(res => {
        this.menuList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  },
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
    }
  },
  data() {
    return {
      isCollapse: false,
      menuList: [],
      iconList: [
        'icon-yonghu4',
        'icon-tijikongjian',
        'icon-shangpin',
        'icon-danju',
        'icon-baobiao'
      ]
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
    padding-left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background-color: #373d41;
    .login-box {
      display: flex;
      align-items: center;
      img {
        width: 50px;
      }
      span {
        padding-left: 10px;
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
          user-select: none;
        }
      }
    }
    .el-main{
      background-color: #eaedf1;
      padding: 20px;
    }
  }
}
</style>
