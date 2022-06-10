<template>
  <div class="header-box">
    <div class="header-con">
      <a class="header-logo">
        <img src="@/assets/imgs/logo.svg" class="img-logo" />
        <div class="text-js-form">金山表单</div>
      </a>
      <div class="header-center-box">
        <div class="item">
          <router-link class="item-link" to="/" tag="a">
            <div class="item-text">首页</div>
          </router-link>
        </div>
        <div class="item">
          <router-link class="item-link" to="/solution" tag="a">
            <div class="item-text">行业解决方案</div>
          </router-link>
        </div>
        <div class="item">
          <router-link class="item-link" to="/freeTemplate" tag="a">
            <div class="item-text">免费模板</div>
          </router-link>
        </div>
        <div class="item">
          <router-link class="item-link" to="/help" tag="a">
            <div class="item-text">帮助中心</div>
          </router-link>
        </div>
      </div>
      <div class="header-right-box">
        <div class="little-program">
          <img
            src="@/assets/imgs/little-program.png"
            class="img-little-program"
          />
          <span>小程序</span>
        </div>
        <el-button class="right-now-use" @click="toLogin">立即使用</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
const toLogin = () => {
  router.push({
    path: "/login",
  });
};
</script>
<style lang="css" scoped>
.header-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 888;
  width: 100%;
  height: 56px;
}
.header-con {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  width: 1160px;
  flex-shrink: 0;
  position: relative;
}
/* 头部logo */
.header-logo {
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.img-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  user-select: none;
}
.text-js-form {
  font-size: 18px;
  font-weight: 500;
  color: #3c414b;
  line-height: 25px;
}
/* 中间文字 */
.header-center-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item {
  padding: 0;
  line-height: 1.143;
}
.item-link {
  overflow: inherit;
}
.item-text {
  position: relative;
  margin: 0 20px;
  font-size: 16px;
  font-weight: 500;
  color: #3c414b;
  line-height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item-link :hover {
  color: #1488ed;
}
/* 右边小程序 */
.header-right-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.little-program {
  margin: 0 20px;
  font-size: 16px;
  font-weight: 500;
  color: #3c414b;
  line-height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.img-little-program {
  width: 16px;
  height: 16px;
  margin-right: 2px;
}
img {
  border-style: none;
  vertical-align: middle;
}
a {
  background: transparent;
  text-decoration: none;
}
.right-now-use {
  border-radius: 2px;
  border: 1px solid #1488ed;
  font-size: 14px;
  font-weight: 400;
  color: #1488ed;
  line-height: 32px;
  width: 96px;
  height: 32px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
</style>
