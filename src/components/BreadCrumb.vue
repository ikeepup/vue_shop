<template>
  <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="tire in tires" :key="tire.index">{{tire}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ['tires']
}
</script>

<style lang="less" scoped>
</style>
