<template>
  <Nav class="nav" />
  <div class="main">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import Nav from "@/components/homePage/Nav.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toLogin = () => {
  router.push({
    path: "/login",
  });
};
</script>
<style lang="css" scoped>
.nav {
  position: relative;
}
.main {
  width: 100%;
  height: 100%;
}
</style>
