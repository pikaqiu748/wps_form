<template>
  <div class="form-header">
    <div class="common">
      <div class="content">
        <div class="head">
          <div class="head_title">{{ formTitle }}</div>
        </div>
        <form>
          <div class="main">
            <AnswerDetail
              v-for="(problem, index) in allProblem"
              :xh="index + 1"
              :title="problem.title"
              :required="JSON.parse(problem.required)"
              :type="problem.type"
              :ans="index < oneFormRes.length ? oneFormRes[index].result : ''"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import AnswerDetail from "@/components/answerType/AnswerDetail.vue";
import { storeToRefs } from "pinia";
import { useFormStore } from "@/store/index";
import { FormService } from "@/api/index";

import { useRoute, useRouter } from "vue-router";

const store = useFormStore();
const { account } = storeToRefs(store);

let allFormRes = ref([]);
let oneFormRes = ref([]);
let allProblem = ref([]);
let formTitle = ref("");
let submitTime = ref("");
const value = ref("");
let formNum = ref<number>();
let nthForm = ref<number>(1);
const handleChange = (value: number) => {
  nthForm.value = value;
  oneFormRes.value = allFormRes.value[value - 1].result;
};

const getOneDetail = async (formId: string) => {
  const res = await FormService.getOneDetail(formId);
  formNum.value = res.data.data.item.length;
  nthForm.value = res.data.data.item.length;
  allFormRes.value = res.data.data.item;
  oneFormRes.value = allFormRes.value[formNum.value - 1].result;
  const problems = await FormService.get({ id: formId });
  allProblem.value = problems.data.data.item.problems;
  formTitle.value = problems.data.data.item.title;
};

const route = useRoute();
let formId = ref<string>();

formId.value = route.query.formId as any;

onMounted(() => {
  console.log(formId.value);
  getOneDetail("f0e66a34-71c0-4a73-93a8-0a5eb12f3cc2");
});

const shortcuts = [
  {
    text: "最近7天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "最近30天",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "最近3个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
</script>
<style lang="css" scoped>
.statics-box {
  height: 100%;
  width: 100%;
  background-color: rgb(242, 244, 247);
}
.statics-con {
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: #f2f4f7;
}
.statics-header {
  margin: auto;
}
.block {
  padding: 10px;
  text-align: left;
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.text {
  font-size: 20px;
  color: #3d4757;
  margin: 10px 8px 20px;
}
.text span {
  display: inline-block;
  color: #c0c6cf;
  font-size: 15px;
}
.submitter {
  color: #3d4757;
  font-size: 20px;
  margin-top: 20px;
  padding-top: 20px;
  margin-left: 10px;
  border-top: 1px solid #e9e9e9;
}
.number {
  margin-left: 10px;
}
.head {
  height: 50px;
  margin: 0 auto;
  padding-top: 20px;
}
.head_title {
  line-height: 22px;
  font-size: 25px;
  text-align: center;
  color: #3d4757;
  font-weight: 500;
  word-break: break-all;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
.main {
  width: 100%;
  height: fit-content;
  margin: 0 auto;
}
/* 重新element-plus样式 */
:deep(.el-range-editor.el-input__inner) {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  width: 250px;
}
#outside {
  background-color: #f2f4f7;
}
.common {
  background-color: #f2f4f7;
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid white;
}
.content {
  background-color: white;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  /* margin-top: 30px; */
  /* margin-bottom: 50px;  */
}
</style>
