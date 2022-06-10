<template>
  <div class="help-box">
    <div class="help-con">
      <div class="nav">
        <img src="@/assets/imgs/js-form.png" class="img-nav" />
        <div class="nav-item">
          <div class="item-title">协作应用</div>
          <a class="item">金山文档</a>
          <a class="item">金山日历</a>
          <a class="item">金山待办</a>
          <a class="item">金山会议</a>
        </div>
        <div class="nav-item">
          <div class="item-title">服务</div>
          <a class="item">帮助中心</a>
          <a class="item">意见反馈</a>
        </div>
        <div class="nav-item">
          <div class="item-title">更多</div>
          <a class="item">金山文档·教育</a>
          <a class="item">WPS官网</a>
        </div>
        <div class="nav-item">
          <div class="item-title">联系我们</div>
          <span class="item-span">微信扫码加群反馈</span>
          <img src="@/assets/imgs/qr-code.png" class="img-nav-item" />
        </div>
      </div>
      <div class="footer-copyright">
        由金山云提供存储服务<br />
        2008-2018 Kingsoft Office Corporation, Al Rights Reserved
        |粤ICP备19016741号4|珠海优艺科技运营
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style lang="css" scoped>
.help-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafdff;
  height: 100%;
}
.help-con {
  display: flex;
  justify-content: space-between;
  width: 1160px;
  flex-shrink: 0;
  padding: 90px 0 32px;
  align-items: center;
  flex-direction: column;
  align-items: stretch;
}
.nav {
  align-items: center;
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}
.img-nav {
  width: 77px;
  height: 77px;
}
.item-title {
  font-size: 20px;
  color: #3d4757;
  line-height: 39px;
}
.item {
  display: block;
  font-size: 16px;
  font-weight: 400;
  color: #767c85;
  line-height: 22px;
  margin-top: 16px;
  cursor: pointer;
}
.item :hover {
  color: #1488ed;
}
.img-nav-item {
  margin-top: 6px;
  width: 96px;
  height: 96px;
}
img {
  border-style: none;
  vertical-align: middle;
}
.item-span {
  display: block;
  font-size: 16px;
  font-weight: 400;
  color: #767c85;
  line-height: 22px;
  margin-top: 16px;
}
.footer-copyright {
  margin-top: 156px;
  font-size: 14px;
  font-weight: 400;
  color: #c2c4c6;
  line-height: 26px;
  text-align: center;
}
</style>
