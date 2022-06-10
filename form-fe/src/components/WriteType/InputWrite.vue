<template>
  <div class="questionItem">
    <div class="form_title">
      <span class="requirestyle" v-show="required">*</span>
      <span v-show="!required" class="placeholder">*</span>
      {{ xh }}. {{ title }}
    </div>
    <div class="form_content">
      <input
        class="form_te"
        placeholder="请输入"
        @blur="emitSonData"
        v-model="value"
      />
      <div v-show="require" class="requireinput">此题为必填，请输入</div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";

export default {
  props: {
    title: String,
    xh: Number,
    id: String,
    ans: String,
    required: Boolean,
    require: Boolean,
  },
  setup(props: any, ctx: any) {
    let value = ref<String>();
    const emitSonData = () => {
      ctx.emit("sonDataName", value);
    };
    return {
      emitSonData,
      value,
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
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 5px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    STHeitiSC-Light, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", SimSun, sans-serif;
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
