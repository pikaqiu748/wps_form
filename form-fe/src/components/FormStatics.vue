<template>
  <div class="form-header">
    <StaticsTableItem
      v-for="(ques, index) in resData"
      :index="ques.index"
      :title="ques.title"
      :resNum="ques.answer?.length"
      :props="ques.props"
      :labels="ques.labels"
      :table-data="ques.answer"
      :key="index"
    />
  </div>
</template>

<script lang="ts" setup>
import StaticsTableItem from './StaticsTableItem.vue'
import { FormService } from '@/api/index'
import { ref, onMounted } from 'vue'
import { useFormStore } from '../store/index'
import { storeToRefs } from 'pinia'
const store = useFormStore()
let formNum = ref<number>()
const resData = ref<Array<quesDataType>>([])
// 每个问题表的属性
interface singleAnswerType {
  index?: number
  content?: string
  others?: string
}

interface multiAnswerType {
  option: string
  count: number
  ratio: string
}

// staticsTableItem组件的属性
interface quesDataType {
  index: number
  title: string
  singleAnswer: Array<singleAnswerType>
  labels: Array<string>
  props: Array<string>
  answer: Array<any>
}
const value = ref('')
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
const getOneFormAllRes = async (formId: string) => {
  const res = await FormService.getAllDetail(formId)
  const problemLen = res.data.data.info.problems.length
  formNum.value = res.data.data.items.length
  let ansForms = res.data.data.items
  if (ansForms.length == 0) {
    return
  }
  let settings = res.data.data.info.problems
  let queses = res.data.data.info.problems
  let quesIdArr: any = {}
  for (let ques of queses) {
    quesIdArr[ques.id] = []
  }
  for (let ques of settings) {
    if (
      ques.type === 'singleSelect' ||
      ques.type === 'multiSelect' ||
      ques.type === 'pullSelect'
    ) {
      let options = ques.setting.options
      for (let option of options) {
        quesIdArr[ques.id].push({
          option: option.title,
          count: 0,
          ratio: '50%',
        })
      }
    }
  }
  let count = 1
  let titles = []
  for (let form of ansForms) {
    // 每一张回答表的所有答案
    let data = form.result
    for (let index in data) {
      let tempObj: any = {}
      tempObj.index = parseInt(index) + 1
      tempObj.title = data[index].title
      let quesType = data[index].type
      if (
        quesType === 'multiSelect' ||
        quesType === 'singleSelect' ||
        quesType === 'pullSelect'
      ) {
        tempObj.labels = ['选项', '计数', '比例']
        tempObj.props = ['option', 'count', 'ratio']
      } else {
        tempObj.labels = ['序号', '内容']
        tempObj.props = ['index', 'content']
      }
      resData.value.push(tempObj)
      let ansCount = 1
      let ans = data[index].result.value
      // ans为score时，是number类型
      if (typeof ans === 'string' || typeof ans === 'number') {
        quesIdArr[data[index].id].push({ index: ansCount, content: ans })
        ansCount++
      } else if (Array.isArray(ans)) {
        // 数组,多选答案
        for (let ansItem of ans) {
          for (let item of quesIdArr[data[index].id]) {
            if (item.option === ansItem.title) {
              item.count += 1
            }
          }
        }
      } else {
        // 单选答案
        for (let item of quesIdArr[data[index].id]) {
          if (item.option === ans.title) {
            item.count += 1
          }
        }
      }
    }
  }
  
  // 问题的个数
  resData.value = resData.value.slice(0, problemLen)
  //  加序号
  for (let key in quesIdArr) {
    let len = 1
    for (let index in quesIdArr[key]) {
      quesIdArr[key][index].index = len++
    }
  }
  let i = 0
  for (let id in quesIdArr) {
    // 展示结果翻转]
    if (quesIdArr[id][0].hasOwnProperty('content')) {
      // 有content，说明是填写选项，需要将填写顺序翻转
      resData.value[i].answer = quesIdArr[id].reverse()
    } else {
      // 保证展示创建表单时，选项的顺序，不翻转
      let all = 0
      for (let ans of quesIdArr[id]) {
        all += ans.count
      }
      for (let ans of quesIdArr[id]) {
        let ratio = (ans.count / all) * 100
        // toFixed默认四舍五入的方式
        ans.ratio = ratio.toFixed(0) + '%'
      }
      resData.value[i].answer = quesIdArr[id]
    }
    i++
  }
}

onMounted(() => {
  const { formId } = storeToRefs(store)
  getOneFormAllRes(formId.value)
})

// resData需要的数据格式
// const resData = ref<Array<quesDataType>>([
//   {
//     index: 1,
//     title: 'what is your name?',
//     labels: ['序号', '内容'],
//     props: ['index', 'content'],
//     answer: [
//       {
//         index: 1,
//         content: 'tom',
//       },
//       {
//         index: 2,
//         content: 'jerry',
//       },
//     ],
//   },
//   {
//     index: 2,
//     title: 'hello world?',
//     labels: ['序号', '内容', '其他'],
//     props: ['index', 'content', 'others'],
//     answer: [
//       {
//         index: 1,
//         content: 'tom',
//         others: 'vue3',
//       },
//     ],
//   },
// ])
</script>
<style lang="css" scoped>
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
</style>
