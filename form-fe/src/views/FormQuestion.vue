<template>
  <div class="common">
    <div class="content">
      <div class="head">
        <div class="head_title">{{ form.title }}</div>
        <div class="head_title_down">
          {{ form.subTitle }}
        </div>
      </div>

      <div class="main">
        <div v-for="(n, index) in form.problems" :key="n.id">
          <div v-if="n.type === 'input'">
            <InputWrite
              :required="n.required"
              :xh="index + 1"
              :title="n.title"
              :id="n.id"
            />
          </div>
          <div v-if="n.type === 'singleSelect'">
            <SingleSelectWrite
              :required="n.required"
              :xh="index + 1"
              :title="n.title"
              :id="n.id"
              :radiomsg="n.setting.options"
            />
          </div>
          <div v-if="n.type === 'multiSelect'">
            <MultiSelectWrite
              :required="n.required"
              :xh="index + 1"
              :title="n.title"
              :id="n.id"
              :rmultiselectmsg="n.setting.options"
            />
          </div>
          <div v-if="n.type === 'pullSelect'">
            <PullSelectWrite
              :required="n.required"
              :xh="index + 1"
              :title="n.title"
              :id="n.id"
              :pullselectmsg="n.setting.options"
            />
          </div>
          <div v-if="n.type === 'date'">
            <DateWrite
              :required="n.required"
              :xh="index + 1"
              :title="n.title"
              :id="n.id"
            />
          </div>
          <div v-if="n.type === 'time'">
            <TimeWrite
              :required="n.required"
              :xh="index + 1"
              :title="n.title"
              :id="n.id"
            />
          </div>
          <div v-if="n.type === 'score'">
            <RateWrite
              :required="n.required"
              :xh="index + 1"
              :title="n.title"
              :id="n.id"
            />
          </div>
        </div>
        <div class="questionItembtn">
          <div class="form_content">
            <el-button type="primary" size="large" disabled class="btn_submit"
              >提交</el-button
            >
          </div>
        </div>
      </div>

      <div class="footer">
        <el-button type="primary" class="btnt" @click="inputform"
          >填写表单
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onBeforeMount, ref } from "vue";
import { IGetFrom, IForm } from "@/types/request";
import { FormService } from "@/api/index";
import InputWrite from "@/components/WriteType/InputWrite.vue";
import SingleSelectWrite from "@/components/WriteType/SingleSelectWrite.vue";
import MultiSelectWrite from "@/components/WriteType/multiSelectWrite.vue";
import PullSelectWrite from "@/components/WriteType/pullSelectWrite.vue";
import DateWrite from "@/components/WriteType/DateWrite.vue";
import TimeWrite from "@/components/WriteType/TimeWrite.vue";
import RateWrite from "@/components/WriteType/RateWrite.vue";
import { useRouter, useRoute } from "vue-router";
import { useFormStore } from "../store/index";
import { storeToRefs } from "pinia";
const store = useFormStore();

let getfrom = reactive<IGetFrom>({
  id: "",
});
let form = ref<IForm>({
  id: "",
  title: "",
  subTitle: "",
  status: null,
  ctime: null,
  utime: null,
  author: "",
  isStar: null,
  problems: null,
});
onBeforeMount(async () => {
  try {
    const { formId } = storeToRefs(store);
    getfrom.id = formId.value;
    const res = await FormService.get(getfrom);
    form.value = res.data.data.item;
  } catch (error) {
    console.log("invalid cache");
  }
});
//进去填写表单页面
const router = useRouter();

const inputform = () => {
  router.push(`/writeform/${form.value.id}`);
};
</script>
<style lang="css" scoped>
.common {
  background-color: #f2f4f7;
  height: 100vh;
  width: 100%;
  height: 100%;
  position: relative;
}
.content {
  background-color: white;
  width: 944px;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
}
div::-webkit-scrollbar {
  width: 0;
}
.head {
  height: 100px;
  margin: 0 auto;
  padding-top: 20px;
}
.head_title {
  line-height: 22px;
  font-size: 20px;
  text-align: center;
  color: #3d4757;
  font-weight: 700;
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
  color: #767c85;
  font-family: inherit;
}
.main {
  width: 80%;
  /* height: 600px; */
  position: relative;
  margin: 0 auto;
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
  padding-bottom: 20px;
}
.btn_submit {
  display: flex;
  margin: 0 auto;
  background-color: #a1cff8;
  width: 96px;
  border: none;
  height: 32px;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 2px;
  color: #3d4757;
  font-size: 14px;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  padding: 0 20px;
  cursor: pointer;
  color: white;
}

.footer {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  position: fixed;
  z-index: 997;
  left: 50%;
  bottom: 0;
  width: 944px;
  height: 130px;
  transform: translateX(-50%);
  background-color: #fff;
  padding-left: 22px;
}
.questionItembtn {
  position: relative;
  padding: 24px 0;
  padding-top: 16px;
  margin-bottom: 90px;
}
.btnt {
  min-width: 156px;
  margin: 17px 0 21px;
  background-color: #1488ed;
  border: none;
  color: #fff;
}
.footerwrite {
  color: #1488ed;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.diatitle {
  line-height: 20px;
  font-size: 14px;
  color: #3d4757;
  margin-bottom: 10px;
  border-top: 1px solid rgba(25, 55, 88, 0.1);
  padding-top: 10px;
}
.diacontent {
  font-size: 14px;
  color: #767c85;
  text-align: left;
  line-height: 22px;
}
</style>
