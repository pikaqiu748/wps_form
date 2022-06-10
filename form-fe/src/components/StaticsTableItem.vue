<template>
  <div class="table-box">
    <div class="question">{{ index }}.{{ title }}</div>
    <div class="collect">收集结果：{{ resNum }}条</div>
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column align="center" v-for="(prop, index) in props" :key="index" :label="labels[index]" :prop="prop">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineProps({
  index: Number,
  title: String,
  resNum: Number,
  tableData:Array,
  props: Array,
  labels: Array,
})

</script>
<style lang="css" scoped>
.question {
  font-size: 16px;
  color: #767c85;
  margin-left: 8px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.collect {
  font-size: 14px;
  color: #aeb5c0;
  margin-left: 10px;
  margin-bottom: 20px;
}
/* 重新element-plus样式 */
.el-table {
  /* margin-left: 10px; */
  margin: auto;
}
</style>
