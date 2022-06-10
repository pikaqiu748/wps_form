<template>
  <Header />
  <div class="statics-box">
    <div class="statics-con">
      <el-tabs type="border-card" id="outside" @tab-click="handleClick">
        <el-tab-pane label="数据统计&分析" class="static-analyse">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="表单问题" class="static-analyse">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="分享" class="static-analyse">
          <router-view></router-view>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import Header from '@/components/Header.vue'
const router = useRouter()
const route = useRoute()
const formId = ref('')
onMounted(() => {
  formId.value = route.params.formId as string
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  switch (tab.index) {
    case '0':
      router.push({
        name: 'FormStatics',
        params: {
          formId: formId.value,
        },
      })
      break
    case '1':
      router.push({
        name: 'FormProblem',
        params: {
          formId: formId.value,
        },
      })
      break
    case '2':
      router.push({
        name: 'FormShare',
        params: {
          formId: formId.value,
        },
      })
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
