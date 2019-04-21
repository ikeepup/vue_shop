<template>
  <div class="user-container">
    <bread-crumb :tires="tires"></bread-crumb>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tires: ['用户管理','用户列表']
        }
    },
}
</script>

<style lang="less" scoped>
</style>
