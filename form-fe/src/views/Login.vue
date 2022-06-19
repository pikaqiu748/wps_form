<template>
  <div class="login-box">
    <div class="head">
      <div class="head-con">
        <span class="logo"></span>
      </div>
    </div>
    <div class="login">
      <el-form ref="loginRef" :model="userInfo" :rules="loginRules">
        <h2>欢迎登录金山表单</h2>
        <el-form-item prop="account">
          <el-input v-model="userInfo.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            v-model="userInfo.pwd"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-checkbox
          v-model="aotuoChecked"
          label="自动登录"
          style="margin-right: 210px"
        />
        <div>
          <el-button type="primary" @click="login" :disabled="!checked"
            >立即登录</el-button
          >
        </div>
        <div class="login-bottom">
          <el-link type="primary" @click="toRegister">尚未注册？</el-link>
        </div>
        <div class="login-read">
          <el-checkbox
            text-color="black"
            v-model="checked"
            label=""
            @change="checkedChange"
          />
          <el-link :underline="false" class="login-wordcolor">
            已阅读并同意
          </el-link>
          <el-link
            class="login-privacy"
            href="http://www.wps.cn/privacy/privacyprotect/"
            target="_blank"
            :underline="false"
            >隐私协议
          </el-link>
          <el-link :underline="false" class="login-wordcolor"> 和 </el-link>
          <el-link
            class="login-onlineservice"
            href="http://www.wps.cn/privacy/account/"
            target="_blank"
            :underline="false"
          >
            在线服务协议
          </el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { UserService } from "@/api/index";
import { useFormStore } from "@/store/index";
import { storeToRefs } from "pinia";

const aotuoChecked = ref(true);
const router = useRouter();
const loginRef = ref<FormInstance>();
const store = useFormStore();
const { account, password, checked } = storeToRefs(store);
const userInfo = reactive({
  id: "",
  nickname: "",
  account: "admin",
  pwd: "Admin@123",
  password: password.value,
  avatar: "",
});
const loginRules = reactive<FormRules>({
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
  ],
  pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const checkedChange = () => {
  checked.value = true;
};

const login = async () => {
  try {
    const res = await UserService.login(userInfo);
    const { password, id } = res.data.data;
    store.$patch((state) => {
      state.account = userInfo.account;
      state.password = password;
      state.id = id;
    });
    router.push({
      path: "/home",
    });
  } catch (error) {
    ElMessage({
      message: error.msg,
      type: "warning",
    });
  }
};

const toRegister = () => {
  checked.value = false;
  router.push({
    path: "/register",
  });
};
</script>
<style lang="css" scoped>
/* 登录页面全局样式*/
.login-box {
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
.login {
  overflow: hidden;
  width: 358px;
  margin: 90px auto;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  position: relative;
}
.login h2 {
  color: #535252;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}

/* 隐私协议样式 */
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
.el-input {
  width: 260px;
  height: 40px;
  margin-top: 20px;
}
.el-button {
  width: 260px;
  height: 40px;
  margin-top: 10px;
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
/* 底部样式 */
.login-bottom {
  display: flex;
  flex-direction: row-reverse;
  /* justify-content: space-between; */
  margin: 0 30px;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
}
</style>
