<template>
  <div>
    <h1>默认页面</h1>
    <button @click="toHome">toHome</button>
    <router-link :to="{ path: '/formcollect' }">表单填写详情-收集</router-link>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const toHome = (): void => {
  router.push({
    path: '/home',
  })
}
</script>
<style lang="css" scoped></style>
