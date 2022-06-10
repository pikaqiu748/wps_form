<template>
   <div>
      <!-- 选择题组件 单选，多选，下拉可复用 -->
      <ChoiceItem v-for="(option, index) in options1" :key="option.id" :option="option" :index="index"
         @deleteItem="deleteItem" :visible="visible">
         <!-- 插槽slot里的内容 根据类型判断显示哪个内容 -->
         <div v-if="type == 'singleSelect'" class="item-icon single-select"></div>
         <div v-else-if="type == 'multiSelect'" class="item-icon multi-select"></div>
         <div v-else-if="type == 'pullSelect'" class="pull-select"><span>{{ index + 1 }}.</span></div>
      </ChoiceItem>
      <div class="opreate-content" v-show="visible">
         <div class="center" @click="addItem()">
            <el-icon>
               <Plus />
            </el-icon>
            <span>选项</span>
         </div>
         <!-- <div class="preset-answer" @click="clickPreanswer()">
            <span>预设答案</span>
            <el-icon>
               <Warning />
            </el-icon>
         </div> -->
      </div>
   </div>
</template>

<script setup lang="ts">
import ChoiceItem from '@/components/oneProblem/ChoiceItem.vue'
import { ref } from "vue";
import { TProblemType } from '@/types/models'
import {  ESelectOptionStatus, ISelectOption } from "@/types/models";
//接收父组件NewProblem传递过来的参数
const props = defineProps<{
   options: ISelectOption[]
   type: TProblemType
   visible: boolean
}>()
let options1 = ref<ISelectOption[]>()
options1.value = props.options
//点击按钮添加选项
const addItem = () => {
   let number: string = String(options1.value.length + 1)
   options1.value.push({
      id: number,
      title: '',
      status: ESelectOptionStatus.normal
   });
};
//点击×删除选项
const deleteItem = (index: number) => {
   options1.value.splice(index, 1);
};
</script>
<style lang="css" scoped>
.item-icon {
   width: 12px;
   height: 12px;
   border: 1px solid gray;
}

.single-select {
   border-radius: 50%;
}

.center,
.preset-answer {
   display: flex;
   align-items: center;
   height: 40px;
   width: fit-content;
}

.center:deep(.el-icon svg) {
   color: #1488ed;
   width: 12px;
   height: 12px;
   margin-right: 4px;
}

.preset-answer:deep(.el-icon svg) {
   color: gray;
   width: 16px;
   height: 16px;
}

.opreate-content span {
   font-size: 12px;
   color: #1488ed;
   white-space: nowrap;
}

.preset-answer span {
   margin-right: 4px;
}
</style>
