<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'

const route = useRoute()
// 初始化当前面包屑，即使刷新也可以存在页面中
let breadList = ref(route.matched)

watch(route, (newRoute) => {
  getBreadList(newRoute)
})

const getBreadList = (newRoute: any) => {
  if (newRoute.matched) {
    let matched = newRoute.matched.filter(
      (item: any) => item.meta && item.meta.title
    )
    breadList.value = matched
  }
}
</script>
<style lang="css" scoped></style>
