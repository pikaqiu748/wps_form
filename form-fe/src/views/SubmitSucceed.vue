<template>
  <div class="submit-box">
    <div class="submit-header"><HeaderNavWrite /></div>
    <div class="submit-main">
      <div class="submit-con">
        <div class="write-success">
          <img src="@/assets/imgs/write-success.png" alt="" />
          <div class="success-content">
            <div class="success-text">提交成功</div>
            <div class="write-date">今天 {{ timeshow }}</div>
          </div>
        </div>
        <div class="blank">
          <div class="blank-con"></div>
        </div>
        <span class="write-again" @click="toback">再写一份</span>
        <div class="write-content">
          <span class="write-content-index">已填写{{ formNum }}份</span>
          <span class="write-content-line"> </span>
          <span class="write-content-descInfo" @click="watchdetails"
            >查看详情</span
          >
        </div>
        <div class="template-recommend">
          <div class="template-recommend-title">
            <span class="template-recommend-text">表单还能做什么</span>
            <div class="template-recommend-line"></div>
          </div>
          <div class="template-recommend-list">
            <a class="list-item" target="_blank" href="https://www.kdocs.cn">
              <img src="@/assets/imgs/kdocs.svg" class="template-icon" />
              <div class="list-item-content">
                <div class="list-item-subtitle">金山文档</div>
                <div class="list-item-des">多人协作在线Office</div>
              </div>
            </a>
            <div class="list-item">
              <img src="@/assets/imgs/collect.png" class="template-icon" />
              <div class="list-item-content">
                <div class="list-item-subtitle">四川地震</div>
                <div class="list-item-des">救灾互助信息收集</div>
              </div>
            </div>
            <div class="list-item">
              <img src="@/assets/imgs/safe.png" class="template-icon" />
              <div class="list-item-content">
                <div class="list-item-subtitle">安全类测评</div>
                <div class="list-item-des">
                  覆盖防溺水、消防安全、防震减灾、防洪抗灾、反诈等诸多安全知识测试场景。
                </div>
              </div>
            </div>
            <div class="list-item">
              <img src="@/assets/imgs/plus.png" class="template-icon" />
              <div class="list-item-content">
                <div class="list-item-subtitle">健康上报</div>
                <div class="list-item-des">双码收集/智能识别</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormService } from "@/api/index";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderNavWrite from "@/components/HeaderNavWrite.vue";

//统计份数
let formNum = ref<number>();
//记录填写后表的Id
let formId = ref<string>();
//定义路由获取值
const route = useRoute();
formId.value = route.query.formId as any;
//填写时间
let timeshow = ref<string>();
//获得时间
let time = new Date();

// 时间戳格式化
function formatDate(datetime: Date) {
  let date = new Date(datetime); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let hour = ("0" + date.getHours()).slice(-2);
  let minute = ("0" + date.getMinutes()).slice(-2);
  // 拼接
  let result = hour + ":" + minute;
  // 返回
  return result;
}
timeshow.value = formatDate(time);
onMounted(async () => {
  formId.value = route.params.formId as string;
  const res = await FormService.getAllDetail(formId.value);
  formNum.value = res.data.data.items.length;
});

const router = useRouter();

//重新填写
const toback = () => {
  router.push(`/writeform/${formId.value}`);
};

const watchdetails = () => {
  router.push("/formStaticsDetail/formInfo/formStatics");
};
</script>
<style lang="css" scoped>
.submit-box {
  height: 100%;
  background-color: #f2f4f7;
}
.submit-main {
  width: 944px;
  min-height: calc(100vh - 88px);
  background-color: #fff;
  margin: auto;
}
.submit-con {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  background-color: #fff;
}
.write-success {
  display: flex;
  padding-top: 70px;
}
.write-success img {
  display: block;
  width: 40px;
  height: 40px;
  margin-right: 16px;
}
.success-text {
  font-size: 16px;
  color: #767c85;
}
.write-date {
  color: #767c85;
  font-size: 12px;
}
.blank {
  width: 400px;
}
.blank-con {
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
}
.write-again {
  margin-top: 24px;
  width: 100px;
  background-color: #1488ed;
  border: none;
  border-radius: 3px;
  color: #fff;
  display: flex;
  height: 32px;
  align-items: center;
  font-size: 14px;
  justify-content: center;
  user-select: none;
  padding: 0 20px;
  cursor: pointer;
}
.write-content {
  padding-top: 24px;
}
.write-content-index {
  color: #767c85;
}
.write-content-line {
  width: 1px;
  height: 14px;
  background: #e7e9eb;
  margin: 0 8px;
  display: inline-block;
}
.write-content-descInfo {
  font-size: 14px;
  color: #1488ed;
  cursor: pointer;
}

.template-recommend {
  width: 615px;
  margin-top: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.template-recommend-title {
  display: flex;
  justify-content: center;
  position: relative;
}
.template-recommend-list {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  flex-wrap: wrap;
}
.template-recommend-text {
  font-size: 12px;
  color: #767c85;
  padding: 0 26px;
  line-height: 17px;
  height: 17px;
  background-color: #fff;
  z-index: 1;
  position: relative;
}
.template-recommend-line {
  height: 1px;
  background: #e2e6ed;
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.template-recommend-list {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  flex-wrap: wrap;
}
.list-item {
  position: relative;
  width: 144px;
  height: 135px;
  display: inline-block;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  text-decoration: none;
}
.template-icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  margin-left: 33px;
  margin-right: 30px;
  flex-shrink: 0;
  flex-basis: 40px;
}
.list-item-content {
  text-align: center;
  margin-top: 8px;
  max-width: 100%;
}
.list-item-subtitle {
  font-size: 14px;
  color: #3d4757;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-item-des {
  font-size: 12px;
  color: #949aae;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 手机端适配 */
@media screen and (max-width: 640px) {
  .submit-main {
    width: 100%;
  }
  .template-recommend {
    width: 100%;
  }
}
</style>
