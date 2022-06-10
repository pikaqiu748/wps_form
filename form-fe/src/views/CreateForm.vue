<template>
  <div class="body">
    <div class="copy-header"></div>
    <div class="header">
      <router-link to="/home">
        <el-icon>
          <ArrowLeft />
        </el-icon>
      </router-link>
      <img src="../assets/imgs/logo.svg" />
      <span>新建表单</span>
    </div>
    <div class="header1"></div>
    <div class="main">
      <div class="copy-left"></div>
      <div class="main-left">
        <div class="add-title">
          <div class="span-title1">添加题目</div>
          <div class="button-list">
            <el-button v-for="problemType in problemTypes" :key="problemType.type"
              @click="clickButton(problemType.type)">
              {{ problemType.title }}</el-button>
          </div>
        </div>
        <div class="title-model">
          <div class="span-title1">题目模板</div>
          <div class="button-list">
            <el-button @click="addNameModel">姓名</el-button>
            <el-button @click="addSexModel">性别</el-button>
          </div>
        </div>
        <div class="common-title">
          <div class="common-top">
            <div class="span-title">我的常用题</div>
            <div class="span-add" @click="dialogFormVisible = true">添加</div>
          </div>
          <div class="button-list">
            <el-button v-for="commonPronlem in commonPronlems" :key="commonPronlem.id"
              @click="addCommon(commonPronlem.problem)">
              {{ commonPronlem.problem.title }}</el-button>
          </div>
        </div>
      </div>
      <div class="main-center">
        <div class="center-main">
          <el-form ref="ruleFormRef" :model="iCreateFormReq" :rules="rules">
            <!-- 当点击后placeholder，失去焦点后placeholder出现 -->
            <el-form-item prop="title">
              <!--:validate-event="false"让只有在提交按钮点击时才进行验证 iCreateFormReq.title==''不校验，否则就校验 -->
              <el-input v-model="iCreateFormReq.title" maxlength="30" class="form-title" :placeholder="placeholder"
                onfocus="placeholder=''" onblur="placeholder='请输入表单标题'"
                :validate-event="iCreateFormReq.title == '' ? false : true" />
            </el-form-item>
            <el-form-item prop="subTitle" class="el-subtitle">
              <!--autosize:根据内容自动调整高度  -->
              <el-input v-model="iCreateFormReq.subTitle" maxlength="300" class="sub-title" placeholder="输入表单副标题"
                autosize type="textarea" :validate-event="iCreateFormReq.subTitle == '' ? false : true" />
            </el-form-item>
            <div class="content-list">
              <!-- :key不能绑定index，当删除，复制时会发生错乱 -->
              <NewProblem ref="ruleFormRef1" v-for="(newProblem, index) in iCreateFormReq.problems" :key="newProblem.id"
                :newProblem="newProblem" :index="index" @deleteOne="deleteOne(index)"
                @copyProblem="copyProblem(index, newProblem)">
              </NewProblem>
            </div>
          </el-form>
        </div>
        <div class="center-bottom">
          <div class="bottom-img">
            <img src="../assets/imgs/logo.svg" />金山表单
          </div>
          <div class="bottom-besc">
            百万数据收集量
            <el-divider direction="vertical" />可视化结果分析
          </div>
        </div>
      </div>
      <div class="copy-right"></div>
      <div class="main-right">
        <el-row :gutter="8">
          <el-col :span="12">
            <el-button @click="preview(ruleFormRef)">预览</el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click="saveDraft">保存草稿</el-button>
          </el-col>
        </el-row>
        <el-button class="finish-create" @click="finishCreate(ruleFormRef)">完成创建</el-button>
      </div>
    </div>

    <!-- 管理常用题对话框 -->
    <el-dialog v-model="dialogFormVisible" title="管理常用题">
      <div class="center" @click="dialogFormVisible1 = true">
        <el-icon>
          <Plus />
        </el-icon>
        <span>添加新的常用题</span>
      </div>
      <el-table :data="commonPronlems" style="width: 100%">
        <el-table-column prop="problem.title" label="标题" />
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button size="small" type="danger" @click="unCollectProblem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加常用题对话框 -->
    <el-dialog v-model="dialogFormVisible1" title="添加常用题">
      <div class="choice-type">
        <span class="span-shoice">选择题型</span>
        <div class="button-list1">
          <el-button v-for="problemType in problemTypes" :key="problemType.type"
            @click="choiceProType(problemType.type)">
            {{ problemType.title }}</el-button>
        </div>
      </div>
      <el-input disabled class="input-often" placeholder="题目问题即为自定义标题" />
      <div>
        <DialogNewProblem ref="ruleFormRef2" v-for="newProblem in newProblems" :key="newProblem.id"
          :newProblem="newProblem" :index="0">
        </DialogNewProblem>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
          <el-button type="primary" @click="collectProblem()">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import NewProblem from "@/components/oneProblem/NewProblem.vue";
import DialogNewProblem from "@/components/oneProblem/DialogNewProblem.vue";
import { onMounted, ref, reactive, onBeforeMount, onUnmounted } from "vue";
import { ProblemService, FormService } from "@/api/index";
import { IProblemType, TProblemType, IProblem } from "@/types/models";
import {
  ICreateFormReq,
  IStarProblemReq,
  ICancelStarReq,
} from "@/types/request";
import { FormInstance, FormRules } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const ruleFormRef1 = ref();
const ruleFormRef2 = ref();
let problemTypes = ref<IProblemType[]>();
let commonPronlems = ref();
let newProblems = ref<IProblem<TProblemType>[]>([]);
let iStarProblemReq = ref<IStarProblemReq>({
  problem: {
    type: "input",
    title: "",
    required: false,
    setting: null,
  },
});
let iCancelStarReq = ref<ICancelStarReq>({ id: "" });
let iCreateFormReq = ref<ICreateFormReq>({
  title: "",
  subTitle: "",
  problems: [],
});
let placeholder = ref("请输入表单标题");
let dialogFormVisible = ref(false);
let dialogFormVisible1 = ref(false);
//自定义校验
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(
      ElMessage({
        showClose: true,
        message: "请输入表单标题",
        center: true,
        type: "warning",
      })
    );
  } else {
    callback();
  }
};
const validatePass1 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(
      ElMessage({
        showClose: true,
        message: "请输入表单副标题",
        center: true,
        type: "warning",
      })
    );
  } else if (value.length >= 300) {
    callback(
      ElMessage({
        showClose: true,
        message: "最多输入300个字",
        center: true,
        type: "warning",
      })
    );
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  title: [{ validator: validatePass, trigger: "change" }],
  subTitle: [{ validator: validatePass1, trigger: "change" }],
});
//完成创建
const finishCreate = (formEl: FormInstance | undefined) => {
  //校验表单标题和副标题
  const p1 = new Promise(async (resolve, reject) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (valid) {
        resolve("ok");
      } else {
        reject("表单标题没有输入!");
      }
    });
  });
  //校验子组件NewProblem里问题的标题
  const p2 = new Promise(async (resolve, reject) => {
    let length = ruleFormRef1.value.length;
    let unpass = 0;
    for (let i = 0; i < length; i++) {
      //因为这个方法时异步请求，所以一定要加上async await
      await ruleFormRef1.value[i].validateHandle((valid: boolean) => {
        if (!valid) {
          unpass = 1;
        }
      });
      if (unpass === 1) {
        break;
      }
    }
    if (unpass === 0) {
      resolve("ok");
    } else {
      reject("问题名称没有输入!");
    }
  });
  Promise.all([p1, p2])
    .then(() => {
      //全部验证通过就会走这里，向后台发送创建请求
      try {
        //如果没有填写选项名称就设置选择题选项默认值
        for (let j = 0; j < iCreateFormReq.value.problems.length; j++) {
          if (iCreateFormReq.value.problems[j].type === 'singleSelect' || iCreateFormReq.value.problems[j].type === 'multiSelect' || iCreateFormReq.value.problems[j].type === 'pullSelect') {
            for (let i = 0; i < iCreateFormReq.value.problems[j].setting.options.length; i++) {
              if (iCreateFormReq.value.problems[j].setting.options[i].title === '') {
                iCreateFormReq.value.problems[j].setting.options[i].title = '选项' + (i + 1)
              }
            }

          }
        }
        const res: any = FormService.create(iCreateFormReq.value);
        ElMessage({
          message: "创建成功",
          type: "success",
        });
        router.push({
          path: "/home",
        });
      } catch (err) {
        console.trace(err);
        ElMessage({
          message: err,
          type: "warning",
        });
      }
    })
    .catch((result) => {
      console.log(result);
    });
};
//查询题目类型
const getProblemType = async () => {
  try {
    const res: any = await ProblemService.listType();
    problemTypes.value = res.data.data.problemTypes;
  } catch (err) {
    console.trace(err);
  }
};
//获取收藏的题目
const listStar = async () => {
  try {
    const res: any = await ProblemService.listStar();
    commonPronlems.value = res.data.data.items;
  } catch (err) {
    console.trace(err);
  }
};
//收藏题目
const collectProblem = async () => {
  if (!ruleFormRef2.value[0]) return;
  await ruleFormRef2.value[0].validateHandle1(async (valid: boolean) => {
    if (valid) {
      try {
        if (
          iStarProblemReq.value.problem.type === "singleSelect" ||
          iStarProblemReq.value.problem.type === "multiSelect" ||
          iStarProblemReq.value.problem.type === "pullSelect"
        ) {
          //如果没有设置选项题目，就默认为选项1，选项2 ...
          for (
            let i = 0;
            i < iStarProblemReq.value.problem.setting.options.length;
            i++
          ) {
            if (iStarProblemReq.value.problem.setting.options[i].title === "") {
              iStarProblemReq.value.problem.setting.options[i].title =
                `选项` + (i + 1);
            }
          }
        }
        const res: any = await ProblemService.star(iStarProblemReq.value);
        listStar();
        ElMessage({
          message: "添加成功",
          type: "success",
        });
        dialogFormVisible1.value = false;
      } catch (err) {
        console.trace(err);
      }
    } else {
      console.log("error submit!");
    }
  });
};
//取消收藏题目
const unCollectProblem = async (id: string) => {
  iCancelStarReq.value.id = id;
  ElMessageBox.confirm(
    "删除后，创建表单时无法再使用该题进行快速创建，是否删除?",
    "删除常用题",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(async () => {
      try {
        const res: any = await ProblemService.unStar(iCancelStarReq.value);
        listStar();
        ElMessage({
          message: "删除成功",
          type: "success",
        });
      } catch (err) {
        console.trace(err);
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
//点击按钮添加题目
const clickButton = (type: TProblemType) => {
  const id =  nanoid() ;
  if (type == "singleSelect" || type == "pullSelect" || type == "multiSelect") {
    iCreateFormReq.value.problems.push({
      id: id,
      type: type,
      title: "",
      required: false,
      setting: {
        options: [
          {
            id: "1",
            title: "",
            status: 2,
          },
          {
            id: "2",
            title: "",
            status: 2,
          },
        ],
      },
      isNew: true,
    });
  } else {
    iCreateFormReq.value.problems.push({
      id: id,
      type: type,
      title: "",
      required: false,
      setting: null,
      isNew: true,
    });
  }
};
//对话框里点击按钮添加题目
const choiceProType = (type: TProblemType) => {
  const id =  nanoid() ;
  if (type == "singleSelect" || type == "pullSelect" || type == "multiSelect") {
    if (!newProblems) {
      newProblems.value.push({
        id: id,
        type: type,
        title: "",
        required: false,
        setting: {
          options: [
            {
              id: "1",
              title: "",
              status: 2,
            },
            {
              id: "2",
              title: "",
              status: 2,
            },
          ],
        },
      });
    } else {
      newProblems.value.splice(0, 1, {
        id: id,
        type: type,
        title: "",
        required: false,
        setting: {
          options: [
            {
              id: "1",
              title: "",
              status: 2,
            },
            {
              id: "2",
              title: "",
              status: 2,
            },
          ],
        },
      });
    }
  } else {
    if (!newProblems) {
      newProblems.value.push({
        id: id,
        type: type,
        title: "",
        required: false,
        setting: null,
      });
    } else {
      newProblems.value.splice(0, 1, {
        id: id,
        type: type,
        title: "",
        required: false,
        setting: null,
      });
    }
  }
  iStarProblemReq.value.problem = newProblems.value[0];
};
//点击按钮添加常用题
const addCommon = (problem: IProblem<TProblemType>) => {
  let newproblem = {
    // id: problem.id,
    type: problem.type,
    title: problem.title,
    required: problem.required,
    setting: problem.setting,
    isNew: true,
  };
  iCreateFormReq.value.problems.push(newproblem);
};
//点击按钮添加姓名模板
const addNameModel = () => {
  const id =  nanoid() ;
  iCreateFormReq.value.problems.push({
    id: id,
    type: "input",
    title: "姓名",
    required: true,
    setting: null,
    isNew: true,
  });
};
//点击按钮添加性别模板
const addSexModel = () => {
  const id =  nanoid() ;
  iCreateFormReq.value.problems.push({
    id: id,
    type: "singleSelect",
    title: "性别",
    required: false,
    setting: {
      options: [
        {
          id: "1",
          title: "男",
          status: 2,
        },
        {
          id: "2",
          title: "女",
          status: 2,
        },
      ],
    },
    isNew: true,
  });
};
//点击删除按钮删除题目
const deleteOne = (index: number) => {
  iCreateFormReq.value.problems.splice(index, 1);
};
//点击复制按钮复制题目
const copyProblem = (index: number, newProblem: any) => {
  //因为id是在v-for循环时对应的key值，所以是唯一的，所以要修改id的值
  const id =  nanoid() ;
  //不能这样直接赋值，因为这样是浅拷贝，修改newProblem1的id，同时被复制newProblem的id也会跟着改变
  //let newProblem1: any = newProblem
  // 所以要采用深拷贝，这样修改newProblem1的值不会影响newProblem的
  let newProblem1: any = JSON.parse(JSON.stringify(newProblem));
  newProblem1.id = id;
  iCreateFormReq.value.problems.splice(index + 1, 0, newProblem1);
};
//预览
const preview = (formEl: FormInstance | undefined) => {
  //校验表单标题和副标题
  const p1 = new Promise(async (resolve, reject) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
      if (valid) {
        resolve("ok");
      } else {
        reject("表单标题没有输入!");
      }
    });
  });
  //校验子组件NewProblem里问题的标题
  const p2 = new Promise(async (resolve, reject) => {
    let length = ruleFormRef1.value.length;
    let unpass = 0;
    for (let i = 0; i < length; i++) {
      //因为这个方法时异步请求，所以一定要加上async await
      await ruleFormRef1.value[i].validateHandle((valid: boolean) => {
        if (!valid) {
          unpass = 1;
        }
      });
      if (unpass === 1) {
        break;
      }
    }
    if (unpass === 0) {
      resolve("ok");
    } else {
      reject("问题名称没有输入!");
    }
  });
  Promise.all([p1, p2])
    .then(() => {
      //全部验证通过就会走这里，向后台发送创建请求
      //设置选择题选项默认值
      for (let j = 0; j < iCreateFormReq.value.problems.length; j++) {
        if (iCreateFormReq.value.problems[j].type === 'singleSelect' || iCreateFormReq.value.problems[j].type === 'multiSelect' || iCreateFormReq.value.problems[j].type === 'pullSelect') {
          for (let i = 0; i < iCreateFormReq.value.problems[j].setting.options.length; i++) {
            if (iCreateFormReq.value.problems[j].setting.options[i].title === '') {
              iCreateFormReq.value.problems[j].setting.options[i].title = '选项' + (i + 1)
            }
          }
        }
      }
      router.push({
        path: "/FormPreview",
        query: {
          //通过路由传递对象参数需要使用JSON.stringify() 以及encodeURIComponent()进行转换
          iCreateFormReq: encodeURIComponent(JSON.stringify(iCreateFormReq.value)),
        },
      });
    })
    .catch((result) => {
      console.log(result);
    });
};
//保存草稿
const saveDraft = () => {
  localStorage.setItem("iCreateFormReq", JSON.stringify(iCreateFormReq.value));
  ElMessage({
    message: "保存草稿成功",
    type: "success",
  });
};
onBeforeMount(async () => {
  //默认添加一个填空题
  const id =  nanoid() ;
  iCreateFormReq.value.problems.push({
    id: id,
    type: "input",
    title: "",
    required: false,
    setting: null,
    isNew: true,
  });
  if (route.query.iCreateFormReq) {
    //当由预览页面跳到该页面时，会路由传参，这里接收传过来的参数，重新渲染
    try {
      iCreateFormReq.value = JSON.parse(
        decodeURIComponent(route.query.iCreateFormReq as any)
      )._value;
    } catch (error) {
      console.log("invalid cache");
    }
  }
});
onMounted(() => {
  getProblemType();
  listStar();
  choiceProType("input");
  //页面刷新，把存在localStorage的数据取出来重新渲染
  //用户点击保存草稿按钮后，再点击刷新，会使用LocalStorage存储用户已填写的表单信息来进行自动填充
  if (localStorage.getItem("iCreateFormReq")) {
    try {
      iCreateFormReq.value = JSON.parse(localStorage.getItem("iCreateFormReq"));
    } catch (error) {
      console.log("invalid cache");
    }
  }
});
onUnmounted(() => {
  localStorage.removeItem("iCreateFormReq");
});
</script>
<style lang="css" scoped>
* {
  box-sizing: border-box;
}

.body {
  width: 100%;
  height: 100%;
  background-color: #f2f4f7;
}

.header {
  /* 详情页面顶部栏固定在上方 */
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  z-index: 10;
}

.header :deep(.el-icon) {
  color: gray;
}

.header1 {
  position: fixed;
  top: 60px;
  height: 50px;
  width: 100%;
  background-color: #f2f4f7;
  z-index: 10;
}

.copy-header {
  height: 50px;
  width: 100%;
}

.header img {
  height: 30px;
  border-radius: 50%;
  margin: 0px 10px;
}

.main {
  /* margin-top: 50px; */
  display: flex;
  padding-top: 50px;
  padding-left: 26px;
  padding-right: 26px;
  background-color: #f2f4f7;
  overflow: auto;
}

/* main-left  */
.main-left {
  position: fixed;
  width: 220px;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #e7e9eb;
  padding: 24px 16px;
  color: #3d4757;
  overflow-y: scroll;
  max-height: 600px;
}

.copy-left {
  width: 220px;
}

/* main-center */
.main-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;
}

.center-main {
  width: 100%;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e7e9eb;
  padding: 50px 88px;
  overflow: hidden;
}

.copy-right {
  width: 220px;
}

/* main-right */
.main-right {
  width: 220px;
  padding-top: 16px;
  right: 26px;
  position: fixed;
}

.add-title {
  margin-bottom: 20px;
}

.span-title1 {
  font-size: 14px;
  line-height: 20px;
  color: #3d4757;
  font-weight: 700;
  margin-bottom: 11px;
}

.span-title {
  font-size: 14px;
  line-height: 20px;
  color: #3d4757;
  font-weight: 700;
}

.common-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 11px;
  margin-top: 20px;
}

.span-add {
  color: #1488ed;
  font-weight: bold;
}

.button-list {
  display: grid;
  grid-template-columns: repeat(2, 78px);
  gap: 20px 16px;
  width: 172px;
}

.button-list .el-button {
  width: 78px;
  display: block;
  margin-left: 0px;
  /* 让按钮里的文字居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-list {
  margin-top: 20px;
}

/* placeholder文字居中 */
.main-center .sub-title :deep(.el-textarea__inner) {
  text-align: center;
  box-shadow: none;
  /* 去掉文本域右下角的斜线 */
  resize: none;
  border-radius: 0;
  /* 去除右边的滚动条 */
  overflow-y: hidden;
}

.main-center .sub-title :deep(.el-textarea__inner):hover {
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
}

.main-center .sub-title :deep(.el-textarea__inner):focus {
  border-bottom: 1px solid #1488ed;
  border-radius: 0;
}

/* placeholder文字居中 */
.main-center .form-title :deep(.el-input__inner) {
  text-align: center;
}

/* 去掉默认边框阴影 */
.main-center :deep(.el-input__wrapper) {
  box-shadow: none;
}

.main-center .form-title :deep(.el-input__inner) {
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: larger;
}

/* 修改大标题placeholder字体样式 */
.main-center .form-title :deep(.el-input__inner::placeholder) {
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: larger;
}

:deep(.el-form) {
  width: 100%;
}

.el-subtitle {
  padding: 12px 20px;
  margin-bottom: 20px;
}

/* .sub-title :deep(.el-textarea){
  padding: 12px 20px;
} */

.finish-create {
  display: block;
  width: 180px;
  margin: auto;
  background-color: #1488ed;
  /* border: none; */
  color: #fff;
}

.el-row {
  padding-bottom: 20px;
}

.el-row .el-button {
  width: 100%;
}

:deep(.el-form-item__error) {
  display: none;
}

:deep(.el-form-item) {
  margin-bottom: 0px;
}

:deep(.el-form-item__label) {
  padding: 0 0 0 0;
}

.center-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.bottom-img {
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: bold;
}

.bottom-img img {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}

.bottom-besc {
  color: #767c85;
  font-size: 12px;
}

.center {
  display: flex;
  align-items: center;
  height: 40px;
  width: fit-content;
  color: #1488ed;
}

.center:deep(.el-icon svg) {
  color: #1488ed;
  width: 12px;
  height: 12px;
  margin-right: 4px;
}

.choice-type {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-often {
  margin-bottom: 20px;
}

.span-shoice {
  margin-right: 4px;
  font-weight: bold;
}
</style>
