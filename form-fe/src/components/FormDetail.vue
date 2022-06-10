<template>
  <div class="form-header">
    <div class="block">
      <el-date-picker
        v-model="value"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </div>
    <div class="text">
      共收集 {{ formNum }}份数据（正在收集）
      <!-- <span
        >提交者<span style="margin: 0 4px; color: #767c85">南下孤笙</span
        >的分享</span
      > -->
    </div>
    <div class="number">
      第
      <el-input-number
        v-model="nthForm"
        :min="1"
        :max="formNum"
        @change="handleChange"
        size="small"
        style="width: 85px; margin: 10px 2px"
      />份
    </div>
    <div class="submitter">
      <span>提交者:{{ account }}</span
      ><span class="sTime">({{ submitTime }})</span>
    </div>
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
              :ans="index < oneFormRes?.length ? oneFormRes[index].result : ''"
              :sTime="submitTime"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import AnswerDetail from '@/components/answerType/AnswerDetail.vue'
import { storeToRefs } from 'pinia'
import { useFormStore } from '@/store/index'
import { FormService } from '@/api/index'
const store = useFormStore()
const { account } = storeToRefs(store)

let allFormRes = ref([])
let oneFormRes = ref([])
let allProblem = ref([])
let formTitle = ref('')
let submitTime = ref('')
const value = ref('')
let formNum = ref<number>()
let nthForm = ref<number>(1)
const handleChange = (value: number) => {
  nthForm.value = value
  oneFormRes.value = allFormRes.value[value - 1].result
}

const getOneDetail = async (formId: string) => {
  try {
    const res = await FormService.getOneDetail(formId)
    formNum.value = res.data.data.item?.length
    // 没有结果直接退出
    if (formNum.value === 0) {
      return
    }
    nthForm.value = res.data.data.item?.length
    allFormRes.value = res.data.data?.item
    oneFormRes.value = allFormRes.value[formNum.value - 1]?.result
    submitTime.value = allFormRes.value[formNum.value - 1]?.sTime
      .replaceAll('-', '/')
      .replace('T', ' ')
      .slice(0, 19)
    const problems = await FormService.get({ id: formId })
    allProblem.value = problems.data.data.item.problems
    formTitle.value = problems.data.data.item.title
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  const { formId } = storeToRefs(store)
  getOneDetail(formId.value)
})

const shortcuts = [
  {
    text: '最近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近3个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
</script>
<style lang="css" scoped>
.sTime {
  font-size: 15px;
  margin-left: 5px;
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
