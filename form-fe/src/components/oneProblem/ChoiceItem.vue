<template>
   <!-- 单选，多选，下拉三种题选项item组件，实现复用 -->
   <div class="item">
      <!-- 单选，多选，下拉三种题的item选项只是前面的图标不一样，所以使用插槽slot -->
      <slot></slot>
      <el-input v-model="option.title" autosize type="textarea" :placeholder="'选项' + (index + 1)" />
      <el-icon @click="deleteItem(index)" v-show="visible">
         <Close />
      </el-icon>
   </div>
</template>

<script setup lang="ts">
import { ISelectOption } from '@/types/models'
//接收父组件传递过来的参数
const props = defineProps<{
   index: number
   visible: boolean
   option: ISelectOption
}>()
// 向父组件ChoiceQuestion抛出删除事件
const emits = defineEmits(['deleteItem'])
const deleteItem = (index: number) => {
   emits('deleteItem', index)
};
</script>
<style lang="css" scoped>
.item {
   display: flex;
   align-items: center;
}

.item:deep(.el-icon svg) {
   color: gray;
}
 :deep(.el-textarea__inner) {
  box-shadow: none;
  /* 去掉文本域右下角的斜线 */
  resize: none;
  border-radius: 0;
  /* 去除右边的滚动条 */
  overflow-y: hidden;
}

 :deep(.el-textarea__inner):focus {
  box-shadow: none;
  /* 去掉文本域右下角的斜线 */
  resize: none;
  border-bottom: 1px solid #1488ed;
  border-radius: 0;
}
:deep(.el-textarea__inner) {
  font-weight: bold;
  font-size:small;
}
</style>
