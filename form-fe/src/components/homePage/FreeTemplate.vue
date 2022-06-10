<template>
  <div class="free-box">
    <div class="free-con">
      <div class="free-title">从模板出发，开启金山表单之旅</div>
      <a class="check-more"
        >查看更多模板
        <img src="@/assets/imgs/right-arrow.svg" />
      </a>
      <div class="template">
        <a class="template-item">
          <div class="item-name">在线收集</div>
          <div>
            <div class="item-children">学生资料收集表</div>
            <div class="item-children">学生健康信息登记表</div>
            <div class="item-children">销售业绩统计表</div>
            <div class="item-children">订单统计表</div>
            <div class="item-children">货物盘点记录表</div>
            <div class="item-children">考勤统计表</div>
          </div>
        </a>
        <a class="template-item">
          <div class="item-name">签到打卡</div>
          <div>
            <div class="item-children">开心7天收心打卡</div>
            <div class="item-children">远程办公打卡</div>
            <div class="item-children">考勤+健康情况打卡</div>
            <div class="item-children">外出办公打卡</div>
            <div class="item-children">返校通知书确认</div>
            <div class="item-children">上课签到</div>
          </div>
        </a>
        <a class="template-item">
          <div class="item-name">在线考试</div>
          <div>
            <div class="item-children">小学数学试题</div>
            <div class="item-children">高中语文随堂测验</div>
            <div class="item-children">初中英语随堂测试</div>
            <div class="item-children">驾考科目一练习题</div>
            <div class="item-children">货物盘点记录表</div>
            <div class="item-children">公务员自测</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style lang="css" scoped>
.free-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 129, 252, 0.03);
}
.free-con {
  width: 1156px;
  flex-shrink: 0;
  padding: 100px 0 120px;
}
.free-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  flex-direction: column;
  font-size: 36px;
  font-weight: 600;
  color: #3e3e3e;
}
.check-more {
  font-size: 18px;
  font-weight: 400;
  color: #1488ed;
  margin: 13px 0 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}
.check-more img {
  width: 16px;
  height: 16px;
  user-select: none;
}
a {
  background: transparent;
  text-decoration: none;
  color: #1890ff;
  transition: color 0.3s;
}
img {
  border-style: none;
  vertical-align: middle;
}
.template {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.template-item {
  width: 332px;
  height: 442px;
  background: #fff;
  box-shadow: 0 15px 20px 0 hsl(0deg 0% 68% / 10%);
  border-radius: 10px;
  padding: 30px 0 66px;
  cursor: pointer;
}
.template-item :hover {
  color: #1488ed;
}
.item-name {
  width: 210px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border-radius: 28.5px;
  font-size: 24px;
  font-weight: 500;
  color: #3e3e3e;
  margin: 0 auto 38px;
}
.item-children {
  margin-top: 22px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  line-height: 22px;
  text-align: center;
}
</style>
