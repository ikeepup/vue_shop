<template>
  <div>
    <bread-crumb :tires="tires"></bread-crumb>
    <el-card>
      <div>
        <el-table :data="rightsData" stripe style="width: 100%" border highlight-current-row>
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="authName" label="权限名称"></el-table-column>
          <el-table-column prop="path" label="路径"></el-table-column>
          <el-table-column prop="level" label="等级">
            <template slot-scope="info">
              <el-tag v-if="info.row.level==='0'">一级</el-tag>
              <el-tag v-else-if="info.row.level==='1'" type="success">二级</el-tag>
              <el-tag v-else type="warning">三级</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.$http.get('/rights/list').then(res => {
      this.rightsData = res.data.data
    })
  },
  data() {
    return {
      tires: ['权限管理', '权限列表'],
      rightsData: []
    }
  }
}
</script>

<style lang="less" scoped>
</style>
