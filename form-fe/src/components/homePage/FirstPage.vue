<template>
  <!-- 首页 -->
  <div class="first-box">
    <div class="first-con">
      <div class="first-title">金山表单<br />便捷的在线信息收集工具</div>
      <div class="describe">
        人人都会用的在线表单，支持手机电脑多端信息同步<br />随时随地查看收集结果
      </div>
      <el-button class="right-now-use" @click="toLogin" type="primary"
        >立即使用</el-button
      >
    </div>
  </div>
  <!-- 行业解决方案 -->
  <div class="solution-box">
    <div class="solution-con">
      <div class="solution-title">各行业解决方案，高效开启在线办公与教学</div>
      <div class="solution-item-list">
        <a class="solution-item">
          <img src="@/assets/imgs/picture1.svg" alt="" />
          <div class="solution-item-name">教学管理</div>
          <div class="solution-item-keywords">学生管理、教务管理</div>
          <div class="solution-item-keywords">在线考试、成绩管理</div>
        </a>
        <a class="solution-item">
          <img src="@/assets/imgs/picture2.svg" alt="" />
          <div class="solution-item-name">销售市场</div>
          <div class="solution-item-keywords">订单管理、客户管理</div>
          <div class="solution-item-keywords">售后管理、业绩管理</div>
        </a>
        <a class="solution-item">
          <img src="@/assets/imgs/picture3.svg" alt="" />
          <div class="solution-item-name">人事行政</div>
          <div class="solution-item-keywords">招聘管理、考勤管理</div>
          <div class="solution-item-keywords">财务管理、培训管理</div>
        </a>
        <a class="solution-item">
          <img src="@/assets/imgs/picture4.svg" alt="" />
          <div class="solution-item-name">生产制造</div>
          <div class="solution-item-keywords">生产管理、订单管理</div>
          <div class="solution-item-keywords">设备管理、人员管理</div>
        </a>
      </div>
    </div>
  </div>
  <!-- 免费模板 -->
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
  <!-- 帮助中心 -->
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
const toLogin = () => {
  router.push({
    path: "/login",
  });
};
</script>
<style lang="css" scoped>
/* 首页 */
.first-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(@/assets/imgs/bgImg.png) no-repeat bottom;
  background-size: cover;
  position: relative;
  height: 100%;
}
.first-con {
  width: 1160px;
  flex-shrink: 0;
  padding: 130px 0 190px;
}
.first-title {
  font-size: 32px;
  font-weight: 500;
  color: #3e3e3e;
  line-height: 42px;
}
.describe {
  width: 43%;
  font-size: 16px;
  font-weight: 400;
  color: #848484;
  line-height: 26px;
  margin: 8px 0 32px;
}
.right-now-use {
  width: 200px;
  height: 48px;
  background: #1488ed;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  user-select: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

/* 行业解决方案 */
.solution-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafdff;
}
.solution-con {
  width: 1070px;
  flex-shrink: 0;
  padding: 150px 0 200px;
}
.solution-title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 36px;
  font-weight: 600;
  color: #3e3e3e;
  line-height: 40px;
}
.solution-item-list {
  display: flex;
  justify-content: space-between;
  margin-top: 153px;
  align-items: normal;
}
.solution-item {
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  cursor: pointer;
  width: 236px;
  min-height: 236px;
  padding: 30px 0 20px;
  transition: box-shadow 0.3s ease-in-out;
  text-align: center;
}
.solution-item :hover {
  color: #1488ed;
}
.solution-item img {
  width: 72px;
  height: 72px;
  user-select: none;
}
img {
  border-style: none;
  vertical-align: middle;
}
.solution-item-name {
  margin: 30px 0 7px;
  font-size: 24px;
  font-weight: 500;
  color: #313131;
  line-height: 40px;
}
.solution-item-keywords {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
  line-height: 20px;
}

/* 免费模板 */
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
/* 帮助中心  */
.help-box {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #fff; */
  background-color: #fafdff;
  /* height: 100%; */
  height: auto;
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
