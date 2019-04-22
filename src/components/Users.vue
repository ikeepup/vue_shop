<template>
  <div class="user-container">
    <bread-crumb :tires="tires"></bread-crumb>
    <el-card>
      <div>
        <el-table :data="userData" stripe style="width: 100%" border highlight-current-row>
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="username" label="用户名" width="300"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#409eff"
                inactive-color="#dcdfe6"
                @change="onOff"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop label="操作"></el-table-column>
        </el-table>
        <pagination :getTableData="getTableData" @passData="getDataFromPagination"></pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tires: ['用户管理', '用户列表'],
      userData: []
    }
  },
  methods: {
    onOff() {
      this.$message.success('修改状态成功')
    },

    async getTableData(pagenum, pagesize) {
      return this.$http.get('/users', {
        params: { pagenum, pagesize }
      })
    },

    getDataFromPagination(dt) {
      console.log(dt)
      this.userData = dt.data.users
    }
  }
}
</script>

<style lang="less" scoped>
</style>
