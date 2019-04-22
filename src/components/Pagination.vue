<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[2, 5, 10, 15]"
    :page-size="2"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  ></el-pagination>
</template>

<script>
export default {
  props: ['total'],
  data() {
    return {
      pagenum: 1,
      pagesize: 2
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('passSize', size)
    },
    handleCurrentChange(current) {
      this.$emit('passCurrent', current)
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
