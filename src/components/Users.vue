<template>
  <div class="user-container">
    <bread-crumb :tires="tires"></bread-crumb>
    <el-card>
      <div>
        <pagination :getData="getuers"></pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getuers()
  },
  data() {
    return {
      tires: ['用户管理', '用户列表'],
      totalPage: 0,
      pagenum: 1,
      pagesize: 2
    }
  },
  methods: {
    getuers() {
      this.$http
        .get('/users', {
          params: { pagenum: this.pagenum, pagesize: this.pagesize }
        })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
