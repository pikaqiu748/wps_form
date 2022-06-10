<template>
  <div class="common-layout">
    <el-container>
      <div class="common">
        <el-header><HeaderNavWrite /></el-header>
        <el-main>
          <div class="content">
            <div class="head">
              <div class="head_title">{{ ICreateFormReqGet.title }}</div>
              <div class="head_title_down">
                {{ ICreateFormReqGet.subTitle }}
              </div>
            </div>
            <div class="main">
              <div v-for="(n, index) in ICreateFormReqGet.problems" :key="n.id">
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
                  <el-button
                    type="primary"
                    disabled
                    size="large"
                    class="btn_submit"
                    >提交</el-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <el-button class="editbtn" type="primary" @click="toback"
              >继续编辑
            </el-button>
          </div>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { FormService } from "@/api/index";
import InputWrite from "@/components/WriteType/InputWrite.vue";
import SingleSelectWrite from "@/components/WriteType/SingleSelectWrite.vue";
import MultiSelectWrite from "@/components/WriteType/multiSelectWrite.vue";
import PullSelectWrite from "@/components/WriteType/pullSelectWrite.vue";
import DateWrite from "@/components/WriteType/DateWrite.vue";
import TimeWrite from "@/components/WriteType/TimeWrite.vue";
import RateWrite from "@/components/WriteType/RateWrite.vue";
import { useRoute, useRouter } from "vue-router";
import { ICreateFormReq } from "@/types/request";
import HeaderNavWrite from "@/components/HeaderNavWrite.vue";

const route = useRoute();
const router = useRouter();
let ICreateFormReqGet = ref<ICreateFormReq>({
  title: "",
  subTitle: "",
  problems: [],
});
onBeforeMount(async () => {
  try {
    ICreateFormReqGet.value = JSON.parse(
      decodeURIComponent(route.query.iCreateFormReq as any)
    );
  } catch (error) {
    console.log("invalid cache");
  }
});

const toback = () => {
  router.push({
    path: "/createForm",
    query: {
      iCreateFormReq: encodeURIComponent(JSON.stringify(ICreateFormReqGet)),
    },
  });
};

const createform = async () => {
  const res: any = await FormService.create(ICreateFormReqGet.value);
  const formid = res.data.data.id;
  console.log(formid);
  router.push({
    path: "/home",
  });
};
</script>
<style lang="css" scoped>
.common {
  background-color: #f2f4f7;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: auto;
}
.content {
  background-color: white;
  width: 944px;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
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
  -webkit-box-pack: center;
  justify-content: center;
  padding: 24px 0;
  font-size: 14px;
  line-height: 20px;
  color: #3d4757;
}
.questionItembtn {
  position: relative;
  padding: 24px 0;
  padding-top: 16px;
  margin-bottom: 90px;
}
.editbtn {
  width: 156px;
  background-color: #1488ed;
  border: none;
  color: #fff;
  display: flex;
  height: 32px;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 2px;
  font-size: 14px;
  -webkit-box-pack: center;
  justify-content: center;
  user-select: none;
  padding: 0 20px;
  cursor: pointer;
  line-height: 20px;
  margin: 0 auto;
}

:deep(.el-header) {
  background-color: white;
  margin-bottom: 20px;
}
</style>
