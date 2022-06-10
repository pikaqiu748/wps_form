<template>
  <div>
    <img class="search_img " :src="search" />
  </div>
</template>

<script setup lang="ts">
import search from '@/assets/imgs/search.png'
</script>
<style lang="css" scoped>
.search_img {
  width: 15px;
  height: 15px;
  margin-top: 10px;
}
</style>
