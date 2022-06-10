<template>
  <div
    ref="codeDom"
    :class="{ 'form-question': visible, 'one-problem': true }"
    @click="clickShow"
  >
    <div class="input-question">
      <el-form ref="ruleFormRef" :model="newProblem" :rules="rules">
        <el-form-item prop="title" :label="index + 1 + '.'">
          <el-input
            v-model="newProblem.title"
            autosize
            type="textarea"
            maxlength="500"
            placeholder="请输入问题"
            :validate-event="newProblem.title == '' ? false : true"
          />
        </el-form-item>
      </el-form>
    </div>
    <!-- 条件判断显示哪中类型题目组件 -->
    <FillinQuestion v-if="type == 'input'"></FillinQuestion>
    <ScoreQuestion v-else-if="type == 'score'"></ScoreQuestion>
    <DateQuestion
      v-else-if="type == 'date' || type == 'time'"
      :type="type"
    ></DateQuestion>
    <ChoiceQuestion
      v-else-if="
        type == 'singleSelect' || type == 'pullSelect' || type == 'multiSelect'
      "
      :type="type"
      :visible="visible"
      :options="newProblem.setting.options"
    >
    </ChoiceQuestion>
    <!-- bottem底部 -->
    <div class="question-bottem" v-show="visible">
      <div class="bottem">
        <el-select
          v-if="type == 'input' || type == 'date' || type == 'time'"
          v-model="selectValue"
          class="m-2"
          placeholder=""
          size="small"
          @change="changeType()"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-else-if="
            type == 'singleSelect' ||
            type == 'multiSelect' ||
            type == 'pullSelect'
          "
          v-model="selectValue"
          class="m-2"
          placeholder=""
          size="small"
          @change="changeType()"
        >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div v-else-if="type == 'score'" class="score-problem">评分题</div>
        <el-divider direction="vertical" />
        <el-button class="copy-button" size="small" @click="copyProblem"
          >复制</el-button
        >
        <el-divider direction="vertical" />
        <div class="must-fill">
          <span>必填</span>
          <el-checkbox v-model="newProblem.required" />
        </div>
        <el-divider direction="vertical" />
        <el-icon class="delete-button" @click="deleteOne">
          <Delete />
        </el-icon>
        <el-icon>
          <MoreFilled />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FillinQuestion from '@/components/problemType/FillinQuestion.vue'
import ChoiceQuestion from '@/components/problemType/ChoiceQuestion.vue'
import DateQuestion from '@/components/problemType/DateQuestion.vue'
import ScoreQuestion from '@/components/problemType/ScoreQuestion.vue'
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { IProblem, TProblemType } from '@/types/models'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
//接收CreateForm父组件传递过来的参数
const props = defineProps<{
  newProblem: IProblem<TProblemType>
  index: number
}>()
let type = ref()
type.value = props.newProblem.type
const selectValue = ref<TProblemType>()
const options = [
  {
    value: 'input',
    label: '填空',
  },
  {
    value: 'date',
    label: '日期',
  },
  {
    value: 'time',
    label: '时间',
  },
]
const options1 = [
  {
    value: 'singleSelect',
    label: '单选题',
  },
  {
    value: 'multiSelect',
    label: '多选题',
  },
  {
    value: 'pullSelect',
    label: '下拉题',
  },
]
//自定义校验
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(
      ElMessage({
        showClose: true,
        message: '问题不能为空，请输入',
        center: true,
        type: 'warning',
      })
    )
  } else if (value.length >= 500) {
    callback(
      ElMessage({
        showClose: true,
        message: '最多输入500个字',
        center: true,
        type: 'warning',
      })
    )
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  title: [{ validator: validatePass, trigger: 'change' }],
})
//校验
const validateHandle = async (callback: Function) => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid) => {
    //通过callback回调函数把valid传递给父组件使用
    callback(valid)
  })
}
const codeDom = ref()
const visible = ref(false)
const emits = defineEmits(['passValidate', 'deleteOne', 'copyProblem'])
// 向父组件CreateForm传递validateHandle校验事件
// const passValidate = (validateHandle: Function) => {
//   //将validateHandle校验方法以参数传递过去
//   emits('passValidate', validateHandle)
// };
// 向父组件CreateForm传递删除事件
const deleteOne = () => {
  emits('deleteOne')
}
// 向父组件CreateForm传递复制事件
const copyProblem = () => {
  emits('copyProblem')
}
//切换type类型
const changeType = () => {
  type.value = selectValue.value
  props.newProblem.type = selectValue.value
}
//点击空白处隐藏背景框
const clickHidden = (e: Event) => {
  if (codeDom.value && !codeDom.value.contains(e.target)) {
    visible.value = false
  }
}
//点击显示背景框
const clickShow = () => {
  visible.value = true
}
onMounted(() => {
  document.addEventListener('click', clickHidden)
  // 初始化selectValue
  if (props.newProblem.type == 'input') {
    selectValue.value = 'input'
  } else if (props.newProblem.type == 'singleSelect') {
    selectValue.value = 'singleSelect'
  } else if (props.newProblem.type == 'multiSelect') {
    selectValue.value = 'multiSelect'
  } else if (props.newProblem.type == 'pullSelect') {
    selectValue.value = 'pullSelect'
  } else if (props.newProblem.type == 'date') {
    selectValue.value = 'date'
  } else if (props.newProblem.type == 'time') {
    selectValue.value = 'time'
  }
})
onUnmounted(() => {
  document.removeEventListener('click', clickHidden)
})
//将validateHandle方法暴露给父组件CreateForm使用
defineExpose({
  validateHandle,
})
</script>
<style lang="css" scoped>
* {
  box-sizing: border-box;
}

.form-question {
  background-color: #fff;
  box-shadow: 0 4px 16px 0 rgb(192 198 207 / 50%);
  border-radius: 2px;
}

.one-problem {
  position: relative;
  padding: 20px 24px 40px;
  width: 100%;
}

.input-question {
  display: flex;
  align-items: center;
  width: 100%;
}

.question-bottem {
  position: absolute;
  bottom: 8px;
  right: 24px;
}

/* bottem */
.bottem {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.bottem:deep(.el-input__wrapper) {
  width: fit-content;
  user-select: none;
  cursor: pointer;
  margin-left: 16px;
  background: rgba(25, 55, 88, 0.08);
  border-radius: 1px;
  margin-right: 16px;
}

.bottem:deep(.el-input__inner) {
  display: block;
  width: 50px;
  text-align: center;
}

.bottem:deep(.el-select-v2__wrapper) {
  width: fit-content;
  user-select: none;
  cursor: pointer;
  margin-left: 16px;
  background: rgba(25, 55, 88, 0.08);
  border-radius: 1px;
  margin-right: 16px;
}

.bottem:deep(.el-select-v2__placeholder) {
  display: block;
  /* width: 50px; */
  text-align: center;
}

.copy-button {
  margin: 0 10px;
}

.delete-button {
  margin: 0 12px;
}

.bottem:deep(.el-icon svg) {
  color: gray;
}

.must-fill {
  display: flex;
  align-items: center;
  margin: 0 10px;
}

.must-fill span {
  padding-right: 8px;
  font-size: 12px;
  color: #949aae;
}

.score-problem {
  margin-left: 16px;
  background: rgba(25, 55, 88, 0.08);
  border-radius: 1px;
  margin-right: 16px;
  font-size: 12px;
  padding: 6px 8px;
  color: #606266;
}

/* placeholder文字居中 */
.one-problem :deep(.el-textarea__inner) {
  box-shadow: none;
  /* 去掉文本域右下角的斜线 */
  resize: none;
  border-radius: 0;
  /* 去除右边的滚动条 */
  overflow-y: hidden;
}

.one-problem :deep(.el-textarea__inner):hover {
  border-bottom: 1px solid #d9d9d9;
}

.one-problem :deep(.el-textarea__inner):focus {
  box-shadow: none;
  /* 去掉文本域右下角的斜线 */
  resize: none;
  border-bottom: 1px solid #1488ed;
  border-radius: 0;
}

/* 加粗标题 */
.input-question :deep(.el-textarea__inner) {
  font-weight: bold;
}
</style>
