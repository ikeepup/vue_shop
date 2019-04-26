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
  props: ['getTableData', 'query'],
  async created() {
    this.refresh()
  },
  data() {
    return {
      pagenum: 1,
      pagesize: 2,
      total: 0
    }
  },
  methods: {
    async refresh() {
      let { data: dt } = await this.getTableData(
        this.query,
        this.pagenum,
        this.pagesize
      )
      this.total = dt.data.total
      this.$emit('passData', dt)
    },
    async handleSizeChange(size) {
      this.pagesize = size
      this.refresh()
    },
    async handleCurrentChange(current) {
      this.pagenum = current
      this.refresh()
    }
  },
  watch: {
    query: function(newValue) {
      if (newValue === '') {
        this.refresh()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
