<template>
   <div>
      <!-- 日期，时间题组件 -->
      <div class="date">
         <!-- 根据类型判断显示时日期图标，还是时间图标 -->
         <!-- 如果是日期类型 -->
         <el-select v-if="type == 'date'" v-model="selectValue" class="m-2" placeholder="" size="small">
            <template #prefix>
               <el-icon class="el-icon--left">
                  <Calendar />
               </el-icon>
            </template>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
         </el-select>
         <!-- 如果是时间类型 -->
         <el-select v-else-if="type == 'time'" v-model="selectValue" class="m-2" placeholder="" size="small">
            <template #prefix>
               <el-icon class="el-icon--left">
                  <Clock />
               </el-icon>
            </template>
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
         </el-select>
         <div>
            <span v-if="type == 'date'">{{ selectValue }}</span>
            <span v-else-if="type == 'time'">{{ newValue }}</span>
         </div>
      </div>
      <div class="divider">
         <el-divider border-style="dashed" />
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { TProblemType } from '@/types/models'
const selectValue = ref('')
//接收父组件NewProblem传递过来的参数
const props = defineProps<{
   type: TProblemType
}>()
const options = [
   {
      value: '年  月',
      label: '年  月',
   },
   {
      value: '年  月  日',
      label: '年  月  日',
   },
   {
      value: '年  月  日  时  分',
      label: '年  月  日  时  分',
   }
]
const options1 = [
   {
      value: '时间：时  分',
      label: '时间：时  分',
   },
   {
      value: '时长：时  分  秒',
      label: '时长：时  分  秒',
   }
]
// 用computed截取掉日期类型：冒号前的内容
const newValue = computed(() => selectValue.value.split('：')[1])
onMounted(() => {
   // 初始化selectValue
   if (props.type == "date") {
      selectValue.value = '年  月  日  时  分'
   }
   else if (props.type == "time") {
      selectValue.value = '时间：时  分'
   }
});
watch(props, () => {
   // 监听到改变再初始化selectValue
   if (props.type == "date") {
      selectValue.value = '年  月  日  时  分'
   }
   else if (props.type == "time") {
      selectValue.value = '时间：时  分'
   }
});
</script>
<style lang="css" scoped>
.date {
   display: flex;
   flex-direction: row;
   align-items: center;
}

.date:deep(.el-input__wrapper) {
   border-radius: 1px;
}

.date:deep(.el-input__inner) {
   width: 0px;
   text-align: center;
}

.date:deep(.el-input__prefix-inner>:last-child) {
   margin-right: 0px;
}

.divider:deep(.el-divider--horizontal) {
   margin: 10px 0;
}

.date:deep(.el-input--small .el-input__wrapper) {
   padding: 1px 0px;
}

.date span {
   margin-left: 6px;
   color: #949aae;
   white-space: pre;
   font-size: 12px;
   text-indent: 3px;
}

.date:deep(.el-icon--left svg) {
   color: #1488ed;
   height: 20px;
   width: 20px;
}

.date:deep(.el-icon) {
   margin: 0 6px;
   height: 1.5em;
   width: 1.5em;
}

.date:deep(.el-icon--left) {
   margin: 0;
}
</style>
