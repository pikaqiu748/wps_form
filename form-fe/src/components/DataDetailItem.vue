<template>
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
    共收集 {{ formNum }} 份数据（正在收集）
    <span
      >来自<span style="margin: 0 4px; color: #767c85">南下孤笙</span
      >的分享</span
    >
  </div>
  <div class="common">
    <div class="content">
      <div class="head">
        <div class="head_title">美甲预约</div>
      </div>
      <form>
        <div class="main">
          <InputWrite xh="1" title="如何称呼您？" />
          <InputWrite xh="2" title="您的手机号？方便我们联系确定" />
          <DateWrite xh="3" title="您准备哪天过来" />
          <InputWrite xh="4" title="大致时段？" />
          <InputWrite xh="5" title="还有什么其他特殊要去么？" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import InputWrite from '@/components/WriteType/InputWrite.vue'
import SingleSelectWrite from '@/components/WriteType/SingleSelectWrite.vue'
import MultiSelectWrite from '@/components/WriteType/multiSelectWrite.vue'
import PullSelectWrite from '@/components/WriteType/pullSelectWrite.vue'
import DateWrite from '@/components/WriteType/DateWrite.vue'
export default {
  name: 'WriteForm',
  setup() {},
  components: {
    InputWrite,
    SingleSelectWrite,
    MultiSelectWrite,
    PullSelectWrite,
    DateWrite,
  },
}
</script>
<style lang="css" scoped>
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
.head {
  height: 50px;
  margin: 0 auto;
  padding-top: 20px;
}
.head_title {
  line-height: 22px;
  font-size: 20px;
  text-align: center;
  color: #3d4757;
  font-weight: 500;
  word-break: break-all;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

.head_title_down {
  margin: 0 auto;
  text-align: center;
  padding: 22px 0 10px;
  line-height: 20px;
}
.main {
  width: 100%;
  height: fit-content;
  margin: 0 auto;
}
.questionItem {
  position: relative;
  padding: 24px 0;
  padding-top: 16px;
}
.form_title {
  font-weight: 700;
  height: 18px;
  max-height: 9.0072e15px;
  text-indent: 20px;
  background-color: #fff;
  opacity: 1;
  cursor: auto;
  text-align: left;
}
.form_content {
  z-index: inherit;
  position: relative;
  margin-top: 8px;
  max-height: 440px;
  overflow-y: auto;
  line-height: 1.5;
  font-weight: 400;
  padding: 8px 0 5px 20px;
  font-size: 14px;
  line-height: 18px;
}
.form_te {
  min-height: 18px;
  background-color: #fff;
  color: #3d4757;
  font-family: Arial;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  color: inherit;
  border-radius: 0;
  border: none;
  resize: none;
  overflow: hidden;
  -webkit-box-shadow: none;
  box-shadow: none;
  outline: none;
  word-break: break-all;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  height: 18px;
  max-height: 9.0072e15px;
  border-bottom: 1px solid black;
}
.btn_submit {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 50px;
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
</style>
