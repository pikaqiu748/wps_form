<template>
  <div class="common-layout">
    <el-container>
      <div class="common">
        <el-header><HeaderNavWrite /></el-header>
        <el-main>
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
                    @sonDataName="getInputData"
                    :require="reh[index]"
                  />
                </div>
                <div v-if="n.type === 'singleSelect'">
                  <SingleSelectWrite
                    :required="n.required"
                    :xh="index + 1"
                    :title="n.title"
                    :id="n.id"
                    :radiomsg="n.setting.options"
                    @sonDataName="getSingleData"
                    :require="reh[index]"
                  />
                </div>
                <div v-if="n.type === 'multiSelect'">
                  <MultiSelectWrite
                    :required="n.required"
                    :xh="index + 1"
                    :title="n.title"
                    :id="n.id"
                    :rmultiselectmsg="n.setting.options"
                    @sonDataName="getMultData"
                    :require="reh[index]"
                  />
                </div>
                <div v-if="n.type === 'pullSelect'">
                  <PullSelectWrite
                    :required="n.required"
                    :xh="index + 1"
                    :title="n.title"
                    :id="n.id"
                    :pullselectmsg="n.setting.options"
                    @sonDataName="getPullData"
                    :require="reh[index]"
                  />
                </div>
                <div v-if="n.type === 'date'">
                  <DateWrite
                    :required="n.required"
                    :xh="index + 1"
                    :title="n.title"
                    :id="n.id"
                    @sonDataName="getDateData"
                    :require="reh[index]"
                  />
                </div>
                <div v-if="n.type === 'time'">
                  <TimeWrite
                    :required="n.required"
                    :xh="index + 1"
                    :title="n.title"
                    :id="n.id"
                    @sonDataName="getTimeData"
                    :require="reh[index]"
                  />
                </div>
                <div v-if="n.type === 'score'">
                  <RateWrite
                    :required="n.required"
                    :xh="index + 1"
                    :title="n.title"
                    :id="n.id"
                    @sonDataName="getRateData"
                    :require="reh[index]"
                  />
                </div>
              </div>
              <div class="questionItem">
                <div class="form_content">
                  <el-button
                    type="primary"
                    size="large"
                    class="btn_submit"
                    @click="inputDate"
                    >提交</el-button
                  >
                  <!-- 弹出框 -->
                  <el-dialog
                    v-model="dialogVisible"
                    title="提交内容"
                    width="30%"
                  >
                    <div class="diacontent">提交后不可修改，确定提交？</div>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogVisible = false"
                          >取消</el-button
                        >
                        <el-button type="primary" @click="inputnext"
                          >确定</el-button
                        >
                      </span>
                    </template>
                  </el-dialog>
                </div>
              </div>
              <!-- 手机端最下面的显示 -->
              <div class="footermobile">
                <p>
                  <span class="logo"></span>由<span class="colorblue"
                    >金山文档</span
                  >旗下表单提供服务
                </p>
              </div>
            </div>
          </div>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, toRaw } from "vue";
import { IGetFrom, IForm, IInputReq } from "@/types/request";
import { IProblem, TProblemType } from "@/types/models";
import { FormService } from "@/api/index";
import InputWrite from "@/components/WriteType/InputWrite.vue";
import SingleSelectWrite from "@/components/WriteType/SingleSelectWrite.vue";
import MultiSelectWrite from "@/components/WriteType/multiSelectWrite.vue";
import PullSelectWrite from "@/components/WriteType/pullSelectWrite.vue";
import DateWrite from "@/components/WriteType/DateWrite.vue";
import TimeWrite from "@/components/WriteType/TimeWrite.vue";
import RateWrite from "@/components/WriteType/RateWrite.vue";
import { useRoute, useRouter } from "vue-router";
import { useFormStore } from "../store/index";
import HeaderNavWrite from "@/components/HeaderNavWrite.vue";
const store = useFormStore();
//控住弹出框
let dialogVisible = ref(false);

//请求获得表单
let getfrom = reactive<IGetFrom>({
  id: "",
});
//定义路由
const route = useRoute();
const router = useRouter();
let reh = ref<Boolean[]>([]);

//获得表单的数据
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
//表单问题
let problem = reactive<Required<IProblem<TProblemType>>[]>([]);
let inputFrom = reactive<IInputReq>({
  formId: "",
  problems: null,
});

onMounted(async () => {
  try {
    //获取传参的表单id
    getfrom.id = route.params.formId as string;
    const res = await FormService.get(getfrom);
    form.value = res.data.data.item;
    problem = res.data.data.item.problems;
  } catch (error) {
    console.log("invalid cache");
  }
});

//填写表单
//文本框
let resultinput = ref([]);
//单选框
let resultSingle = ref([]);
//多选框
let resultmult = ref([]);
//下拉框
let resultpull = ref([]);
//日期
let resultdate = ref([]);
//时间
let resulttime = ref([]);
//评价
let resultrate = ref([]);
const getInputData = (value: String) => {
  resultinput.value.push(value);
};
const getSingleData = (value: String) => {
  resultSingle.value.push(value);
};
const getMultData = (value: String) => {
  resultmult.value.push(value);
};
const getPullData = (value: String) => {
  resultpull.value.push(value);
};
const getDateData = (value: String) => {
  resultdate.value.push(value);
};
const getTimeData = (value: String) => {
  resulttime.value.push(value);
};
const getRateData = (value: String) => {
  resultrate.value.push(value);
};

//数组去重函数
function unique(arr: String[]) {
  return Array.from(new Set(arr));
}
const inputDate = async () => {
  //多选框去重
  const multiSelectDate = unique(resultmult.value);
  //
  let n = 0;
  for (let index = 0; index < problem.length; index++) {
    //判断非空未填数据

    //文本框
    if (problem[index].type === "input") {
      let re = resultinput.value.reverse().pop();
      if (problem[index].required) {
        if (typeof re !== "undefined") {
          problem[index].result = {
            value: re.value,
          };
          reh.value.push(false);
        } else {
          n++;
          reh.value.push(true);
        }
      } else {
        if (typeof re == "undefined") {
          problem[index].result = {
            value: " ",
          };
          reh.value.push(false);
        } else {
          problem[index].result = {
            value: re.value,
          };
          reh.value.push(false);
        }
      }
    }
    //日期类型
    else if (problem[index].type === "date") {
      let re = resultdate.value.reverse().pop();
      if (problem[index].required) {
        if (typeof re !== "undefined") {
          problem[index].result = {
            value: re.value,
          };
          reh.value.push(false);
        } else {
          n++;
          reh.value.push(true);
        }
      } else {
        if (typeof re == "undefined") {
          problem[index].result = {
            value: " ",
          };
          reh.value.push(false);
        } else {
          problem[index].result = {
            value: re.value,
          };
          reh.value.push(false);
        }
      }
    }
    //时间类型
    else if (problem[index].type === "time") {
      let re = resulttime.value.reverse().pop();
      if (problem[index].required) {
        if (typeof re !== "undefined") {
          problem[index].result = {
            value: re.value,
          };
          reh.value.push(false);
        } else {
          n++;
          reh.value.push(true);
        }
      } else {
        if (typeof re == "undefined") {
          problem[index].result = {
            value: " ",
          };
          reh.value.push(false);
        } else {
          problem[index].result = {
            value: re.value,
          };
          reh.value.push(false);
        }
      }
    }
    //分数
    else if (problem[index].type === "score") {
      let re = resultrate.value.reverse().pop();
      if (problem[index].required) {
        if (typeof re !== "undefined") {
          problem[index].result = {
            value: re.value,
          };
          reh.value.push(false);
        } else {
          n++;
          reh.value.push(true);
          // alert("请填写");
        }
      } else {
        if (typeof re == "undefined") {
          problem[index].result = {
            value: " ",
          };
          reh.value.push(false);
        } else {
          problem[index].result = {
            value: re.value,
          };
          reh.value.push(false);
        }
      }
    }
    //单选题
    else if (problem[index].type === "singleSelect") {
      let re = resultSingle.value.reverse().pop();
      if (!problem[index].required) {
        //非必填
        if (typeof re == "undefined") {
          problem[index].result = {
            value: null,
          };
          reh.value.push(false);
        } else {
          //非必填且有值
          let arr = problem[index].setting.options;
          let idOptin;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].title === re.value) {
              idOptin = arr[i].id;
            }
          }
          problem[index].result = {
            value: {
              id: idOptin,
              title: re.value,
            },
          };
          reh.value.push(false);
        }
      } else {
        //必填且有值
        if (typeof re !== "undefined") {
          let arr = problem[index].setting.options;
          let idOptin;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].title === re.value) {
              idOptin = arr[i].id;
            }
          }
          problem[index].result = {
            value: {
              id: idOptin,
              title: re.value,
            },
          };
          reh.value.push(false);
        } else {
          //必填没有值
          n++;
          reh.value.push(true);
          // alert("请填写");
        }
      }
    }
    //下拉选题
    else if (problem[index].type === "pullSelect") {
      let re = resultpull.value.reverse().pop();
      if (!problem[index].required) {
        //非必填没有值
        if (typeof re == "undefined") {
          problem[index].result = {
            value: null,
          };
          reh.value.push(false);
        } else {
          //非必填有值
          let arr = problem[index].setting.options;
          let idOptin;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].title === re.value) {
              idOptin = arr[i].id;
            }
          }
          problem[index].result = {
            value: {
              id: idOptin,
              title: re.value,
            },
          };
          reh.value.push(false);
        }
      } else {
        //必填没有值
        if (typeof re == "undefined") {
          n++;
          reh.value.push(true);
          // alert("请填写");
        } else {
          //必填有值
          let arr = problem[index].setting.options;
          let idOptin;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].title === re.value) {
              idOptin = arr[i].id;
            }
          }
          problem[index].result = {
            value: {
              id: idOptin,
              title: re.value,
            },
          };
          reh.value.push(false);
        }
      }
    }
    //多选框
    else if (problem[index].type === "multiSelect") {
      let h = multiSelectDate.pop() as any;
      //非必填
      if (!problem[index].required) {
        //非必填没有值
        if (typeof h == "undefined") {
          problem[index].result = {
            value: null,
          };
          reh.value.push(false);
        }
        //非必填有值
        else {
          let re = toRaw(h.value);
          let arr = problem[index].setting.options;
          let idOptin;
          let values = [
            {
              id: "",
              title: "",
            },
          ];
          for (let i = 0; i < re.length; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (arr[j].title === re[i]) {
                idOptin = arr[j].id;
                values.push({
                  id: idOptin,
                  title: re[i],
                });
              }
            }
          }
          values.shift();
          problem[index].result = {
            value: values,
          };
          reh.value.push(false);
        }
      }
      //必填
      else {
        //必填没值
        if (typeof h == "undefined") {
          n = n + 1;
          reh.value.push(true);
          // alert("请填写");
        }
        //  必填有值
        else {
          let re = toRaw(h.value);
          let arr = problem[index].setting.options;
          let idOptin;
          let values = [
            {
              id: "",
              title: "",
            },
          ];
          for (let i = 0; i < re.length; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (arr[j].title === re[i]) {
                idOptin = arr[j].id;
                values.push({
                  id: idOptin,
                  title: re[i],
                });
              }
            }
          }
          values.shift();
          problem[index].result = {
            value: values,
          };
          reh.value.push(false);
        }
      }
    }
  }
  if (n > 0) {
    dialogVisible.value = false;
    return;
  }
  dialogVisible.value = true;
  inputFrom.formId = form.value.id;
  inputFrom.problems = problem;
  let res = FormService.input(inputFrom);
};
//跳转到结果成功页面
const inputnext = () => {
  router.push(`/submitSucceed/${getfrom.id}`);
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
  margin-top: 20px;
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
:deep(.el-header) {
  padding: 0;
  position: fixed;
  display: block;
  width: 100%;
  z-index: 1000;
}
:deep(.el-main) {
  margin-top: 80px;
}
.head_title_down {
  margin: 0 auto;
  text-align: center;
  padding: 22px 0 10px;
  line-height: 20px;
}
.main {
  width: 80%;
  height: 100vh;
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
  padding-bottom: 20px;
}
.btn_submit {
  display: block;
  margin: 0 auto;
}
.footermobile {
  display: none;
}

/* 手机端适配 */
@media screen and (max-width: 640px) {
  .common {
    height: 100vh;
    position: relative;
  }

  .content {
    width: 100%;
  }
  .head_title {
    line-height: 0.28rem;
    font-size: 0.2rem;
    color: #333;
    text-align: center;
    word-break: break-all;
    cursor: po;
  }
  .head_title_down {
    white-space: pre-wrap;
    margin: 0;
    overflow: unset;
    font-family: monospace, monospace;
    font-size: 1em;
    color: #9b9b9b;
  }
  .main {
    padding: 0.24rem 0.42rem 0.85rem;
    background-color: #fff;
    box-sizing: border-box;
    line-height: 1;
    cursor: pointer;
    font-size: 14px;
    width: 100%;
  }
  .questionItem {
    margin-top: 0.3rem;
    position: relative;
    box-sizing: border-box;
    line-height: 1;
    cursor: pointer;
    font-size: 14px;
    position: relative;
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
  .btn_submit {
    width: 100%;
    border-radius: 0.03rem;
    background-color: #3692f5;
    border: none;
    color: #fff;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 0.16rem;
    padding: 0 0.12rem;
    -webkit-box-pack: center;
    justify-content: center;
    user-select: none;
  }
  .footermobile {
    margin-top: 0.375rem;
    font-size: 0.12rem;
    color: #9b9b9b;
    line-height: 0.085rem;
    text-align: center;
    margin: 12px 0 0;
    background: #f5f5f5;
    font-weight: 400;
    padding: 15px 0 calc(8px + env(safe-area-inset-bottom) / 2);
    flex-shrink: 0;
    box-sizing: border-box;
    cursor: pointer;
    width: 100%;
    display: block;
  }
  .logo {
    background: url(@/assets/imgs/logo.svg) no-repeat;
    width: 16px;
    height: 16px;
    -webkit-background-size: cover;
    background-size: cover;
    display: inline-block;
    margin-right: 9px;
    line-height: 1;
    cursor: pointer;
  }
  .colorblue {
    color: #3692f5;
  }
  :deep(.el-dialog) {
    width: 80%;
  }
  :deep(.el-dialog__header) {
    color: #000;
    font-size: 0.18rem;
    line-height: 0.25rem;
    cursor: pointer;
    text-align: center;
  }

  :deep(.el-dialog__headerbtn) {
    display: none;
  }
  :deep(.el-dialog__body) {
    font-size: 0.15rem;
    color: rgba(0, 0, 0, 0.4);
    line-height: 0.21rem;
    text-align: left;
    display: inline-block;
    word-break: break-all;
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
  }
  :deep(.el-dialog__footer) {
    font-size: 0.15rem;
    color: rgba(0, 0, 0, 0.4);
    line-height: 0.21rem;
    text-align: left;
    display: inline-block;
    word-break: break-all;
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
    width: 100%;
  }
  :deep(.el-dialog__footer.el-button) {
    width: 48%;
    background-color: white;
    border: 0;
    color: #000;
    height: 100%;
    border-right: 1px solid #f2f2f2;
  }
  :deep(.el-dialog__footer.el-button--primary) {
    color: #409eff;
  }
}
</style>
