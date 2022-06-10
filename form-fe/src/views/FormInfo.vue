<template>
  <div class="form-con">
    <el-tabs type="border-card" id="inside" @tab-click="handleClick">
      <el-tab-pane label="数据统计" class="data-static" id="outside-tab-pane">
        <!-- <FormStatics /> -->
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="数据详情">
        <!-- <FormDetail /> -->
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useFormStore } from '../store/index'
import { storeToRefs } from 'pinia'

const store = useFormStore()
const router = useRouter()
const route = useRoute()
onMounted(() => {
  const { formId } = storeToRefs(store)
  formId.value = formId.value
})
const handleClick = (tab: TabsPaneContext, event: Event) => {
  switch (tab.index) {
    case '0':
      router.push('/formStaticsDetail/formInfo/formStatics')
      break
    case '1':
      router.push('/formStaticsDetail/formInfo/formDetail')
      break
  }
}
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
  font-size: 15px;
  margin-top: 20px;
  padding-top: 20px;
  margin-left: 10px;
  border-top: 1px solid #e9e9e9;
}
.number {
  margin-left: 10px;
}
/* 重新element-plus样式 */
:deep(.el-range-editor.el-input__inner) {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  width: 250px;
}

.form-con {
  width: 80%;
  margin: auto;
}
#outside {
  background-color: #f2f4f7;
}
</style>
