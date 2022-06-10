<template>

  <div class="questionItem">
    <div class="form_title">
      <span class="requirestyle" v-show="required">*</span>
      <span v-show="!required" class="title" style="opacity: 0; font-size: 30px"
        >*</span
      >
      {{ xh }}. {{ title }}
    </div>
    <div v-if="ans">
      <div class="form_content">
        <!-- <div v-if="ans !== ''"> -->
        <span v-if="type === 'pullSelect'">{{
          ans ? ans.value.title : '此题未填写'
        }}</span>
        <span v-else-if="type === 'singleSelect'">{{
          ans ? ans.value.title : '此题未填写'
        }}</span>
        <span v-else-if="type === 'multiSelect' && ans !== ''">
          <ul>
            <li
              class="muti-select"
              v-for="(item, index) in ans.value"
              :key="index"
            >
              {{ item.title }}
            </li>
          </ul>
        </span>
        <span v-else>{{ ans.value }}</span>
      </div>
    </div>
    <div v-else class="form_content no-ans">此题未填写</div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'

export default {
  props: {
    xh: Number,
    title: String,
    required: Boolean,
    type: String,
    ans: {
      type: [String, Object],
    },
    problem: Array,
    sTime: String,
  },
  setup(props: any, ctx: any) {
    let value = ref<String>()
    const emitSonData = () => {
      ctx.emit('sonDataName', value)
    }
    return {
      emitSonData,
      value,
    }
  },
}
</script>
<style lang="css" scoped>
.questionItem {
  position: relative;
  padding: 24px 0;
  padding-top: 16px;
}
.form_title {
  color: black;
  width: 100%;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 500;
}
.title {
  font-size: 30px;
}

.requirestyle {
  color: red;
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
  line-height: 18px;
  padding-bottom: 5px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    STHeitiSC-Light, Microsoft YaHei, '\5FAE\8F6F\96C5\9ED1', SimSun, sans-serif;
}
.form_content span {
  color: #1e1e1e;
}
.form_content.no-ans {
  color: rgb(160, 160, 160);
}
.form_content li {
  margin-bottom: 15px;
  list-style: none;
  color: #1e1e1e;
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
  border-bottom: 1px solid rgba(25, 55, 88, 0.1);
  margin-bottom: 20px;
}
.form_te:hover {
  border-bottom: 1px solid #1488ed;
}
</style>
