<template>
  <div class="questionItem">
    <div class="form_title">
      <span v-show="required">*</span
      ><span v-show="!required" class="placeholder">*</span> {{ xh }}.
      {{ title }}
    </div>
    <el-radio-group v-model="radio" class="singleradio">
      <el-radio
        :label="n.title"
        @change="emitSonData"
        v-for="n in radiomsg"
        :key="n.id"
        id="n.id"
        >{{ n.title }}</el-radio
      >
    </el-radio-group>
    <div v-show="require" class="requireinput">此题为必填，请输入</div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { ESelectOptionStatus } from "@/types/request";

export default {
  props: {
    title: String,
    xh: Number,
    id: String,
    required: Boolean,
    require: Boolean,
    radiomsg: {
      type: Array,
      id: String,
      title: String,
      status: ESelectOptionStatus,
    },
  },
  setup(props: any, ctx: any) {
    const radio = ref();
    const emitSonData = () => {
      ctx.emit("sonDataName", radio);
    };
    watch(radio, () => {
      console.log("改变", radio);
    });
    return {
      radio,
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
.singleradio {
  padding-left: 30px;
  margin-top: 6px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
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
  margin-bottom: 20px;
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
  margin-left: 30px;
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
  .singleradio {
    width: 100%;
    flex-wrap: wrap;
    box-sizing: border-box;
    line-height: 1;
    cursor: pointer;
    padding-left: 30px;
    margin-top: 6px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
}
</style>
