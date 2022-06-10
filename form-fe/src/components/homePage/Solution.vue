<template>
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
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style lang="css" scoped>
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
</style>
