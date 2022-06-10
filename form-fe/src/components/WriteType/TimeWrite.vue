<template>
  <div class="questionItem">
    <div class="form_title">
      <span v-show="required">*</span
      ><span v-show="!required" class="placeholder">*</span> {{ xh }}.
      {{ title }}
    </div>
    <div class="form_content">
      <el-time-picker
        v-model="value"
        @blur="emitSonData"
        placeholder="Arbitrary time"
        format="HH:mm:ss"
        value-format="HH:mm:ss"
      />
      <div v-show="require" class="requireinput">此题为必填，请输入</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    title: String,
    xh: Number,
    id: String,
    required: Boolean,
    require: Boolean,
  },
  setup(props: any, ctx: any) {
    const value = ref();
    const emitSonData = () => {
      ctx.emit("sonDataName", value);
    };
    return {
      value,
      emitSonData,
    };
  },
};
</script>
<style lang="css" scoped>
.questionItem {
  position: relative;
  padding: 24px 0;
  padding-top: 16px;
}
.form_title {
  min-height: 18px;
  color: black;
  font-family: Arial;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  border-radius: 0;
  border: none;
  resize: none;
  overflow: hidden;
  box-shadow: none;
  outline: none;
  word-break: break-all;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  max-height: 9.0072e15px;
  text-indent: 20px;
  background-color: #fff;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    STHeitiSC-Light, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", SimSun, sans-serif;
}

.form_title span {
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
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 5px;
}
.form_content:deep().el-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(25, 55, 88, 0.1);
}
.form_content:deep().el-input__wrapper {
  width: 100%;
  display: contents;
  border: none;
}

.placeholder {
  opacity: 0;
}

.requireinput {
  margin-top: 6px;
  left: 0;
  bottom: -22px;
  color: #eb5451;
  font-size: 12px;
}
/* 手机端适配 */
@media screen and (max-width: 640px) {
  .questionItem {
    margin-top: 0.3rem;
    position: relative;
    box-sizing: border-box;
    line-height: 1;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
  .form_title {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    line-height: 1;
    cursor: pointer;
  }
  .form_content {
    margin-top: 0.16rem;
    line-height: 1.5;
    z-index: inherit;
    position: relative;
    max-height: 440px;
    overflow-y: auto;
    cursor: pointer;
  }
}
</style>
