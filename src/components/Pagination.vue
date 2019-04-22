<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[2, 5, 10, 15]"
    :page-size="2"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalPage"
  ></el-pagination>
</template>

<script>
export default {
  data() {
    return {
      totalPage: 0,
      pagenum: 1,
      pagesize: 2
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size
    },
    handleCurrentChange(current) {
      this.pagenum = current
    }
  }
}
</script>

<style lang="less" scoped>
</style>
