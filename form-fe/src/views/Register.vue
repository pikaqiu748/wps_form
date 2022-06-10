<template>
  <div class="register-box">
    <div class="head">
      <div class="head-con">
        <span class="logo"></span>
      </div>
    </div>
    <div class="register">
      <el-form ref="registerRef" :model="registerInfo" :rules="registerRules">
        <div class="register-header">
          <img src="@/assets/imgs/return-arrow.png" alt="" @click="toLogin" />
          <span>账号注册</span>
        </div>
        <el-form-item class="register-user" prop="account">
          <el-input v-model="account" placeholder="账号" autocomplete="off" />
        </el-form-item>
        <el-form-item class="register-password" prop="pwd">
          <el-input
            v-model="pwd"
            type="password"
            placeholder="密码"
            show-password
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item class="register-password" prop="confirmPwd">
          <el-input
            v-model="confirmPwd"
            type="password"
            placeholder="确认密码"
            show-password
            autocomplete="off"
          />
        </el-form-item>
        <span class="tip">密码为8-16位大小写字母、数字或符号3种组合</span>
        <div class="register-btn">
          <el-button type="primary" @click="hasRegister" :disabled="!checked"
            >立即注册</el-button
          >
        </div>
        <div class="login-read">
          <el-checkbox text-color="black" v-model="checked" label="" />
          <el-link :underline="false" class="login-wordcolor"
            >已阅读并同意</el-link
          >
          <el-link
            class="login-privacy"
            href="http://www.wps.cn/privacy/privacyprotect/"
            target="_blank"
            :underline="false"
            >隐私协议</el-link
          >
          <el-link :underline="false" class="login-wordcolor">和</el-link>
          <el-link
            class="login-onlineservice"
            href="http://www.wps.cn/privacy/account/"
            target="_blank"
            :underline="false"
            >在线服务协议</el-link
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { IRegister } from "@/types/models";
import { UserService } from "@/api/index";
import { ref, reactive, toRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useFormStore } from "@/store/index";

const store = useFormStore();
const router = useRouter();
const registerRef = ref<FormInstance>();
const registerInfo: IRegister = reactive({
  id: "",
  nickname: "",
  account: "",
  pwd: "",
  confirmPwd: "",
});
const { checked } = storeToRefs(store);
const { account, pwd, confirmPwd } = toRefs(registerInfo);
let reg =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/;
//密码校验规则
const pwdValidate = (rule: any, value: any, callback: any) => {
  if (pwd.value === "") {
    callback(new Error("请输入密码"));
  } else if (!reg.test(pwd.value) || !reg.test(confirmPwd.value)) {
    callback(new Error("密码为8-16位大小写字母、数字或符号3种组合"));
  } else {
    callback();
  }
};
const confirmPwdValidate = (rule: any, value: any, callback: any) => {
  if (confirmPwd.value === "") {
    callback(new Error("请确认密码"));
  } else if (confirmPwd.value !== pwd.value) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};
const registerRules = reactive<FormRules>({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
  ],
  pwd: [{ validator: pwdValidate, trigger: "blur" }],
  confirmPwd: [{ validator: confirmPwdValidate, trigger: "blur" }],
});
const props = defineProps({});
const toLogin = () => {
  router.push({
    path: "/login",
  });
};
const hasRegister = async () => {
  try {
    const res = await UserService.register(registerInfo);
    console.log(res);
    ElMessage({
      message: "注册成功",
      type: "success",
    });
  } catch (error) {
    ElMessage({
      message: error.msg,
      type: "warning",
    });
  }
};
</script>
<style lang="css" scoped>
/* 注册页面全局样式 */
.register-box {
  padding: 0;
  margin: 0;
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
/* 头部样式 */
.head {
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
}
.head-con {
  display: flex;
  height: 56px;
  max-width: 1180px;
  margin: 0 auto;
  align-items: center;
}
.logo {
  display: inline-block;
  margin-left: 64px;
  vertical-align: top;
  width: 88px;
  height: 22px;
  background-image: url(//ac.wpscdn.cn/account/libs/img/v1/logo.676137dd.png);
}
.register {
  overflow: hidden;
  width: 358px;
  margin: 90px auto;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  position: relative;
}
.register-header {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  height: 25px;
}
.register-header span {
  color: #535252;
  font-size: 20px;
  font-weight: 500;
  margin-left: 65px;
}
.register-header img {
  cursor: pointer;
  margin-left: 35px;
}
.tip {
  display: block;
  font-size: 12px;
  color: #aaa;
  margin-left: -10px;
  margin-top: 12px;
  margin-bottom: 12px;
}
.register-btn {
  margin-top: 0px;
}
.login-read {
  display: flex;
  margin-top: 10px;
}
.login-wordcolor {
  font-size: 12px;
  color: #9b9b9b;
}
.login-privacy,
.login-onlineservice {
  font-size: 12px;
  color: #9b9b9b;
  text-decoration: underline;
}

/* 重置 element plus 样式 */
.el-form {
  padding: 30px 20px;
}
.el-form img {
  width: 20px;
}
.el-input {
  width: 260px;
  height: 40px;
  margin-top: 20px;
}
.el-button {
  width: 260px;
  height: 40px;
}
.el-checkbox {
  color: #aaa;
  margin-left: 29px;
  margin-top: 5px;
  margin-right: 5px;
}
.el-form-item {
  margin-bottom: 0px;
  margin-left: 30px;
}

.el-link {
  margin-top: 4px;
}
:deep(.el-checkbox__label) {
  font-size: 12px;
}
</style>
