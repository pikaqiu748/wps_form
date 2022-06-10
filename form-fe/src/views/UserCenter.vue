<template>
  <!-- 头部 WPS个人中心 -->
  <div class="user-center-header">
    <img
      src="@/assets/imgs/return-arrow.png"
      class="img-arrow"
      @click="toHome"
    />
    <span class="user-center-wps">WPS</span>
    <span class="user-center-word">个人中心</span>
  </div>
  <!-- 退出账号 -->
  <div class="user-center-logout">
    <div class="logout">
      <el-button text @click="dialogVisible = true">退出账号</el-button>
      <el-dialog v-model="dialogVisible" title="退出登录" width="30%">
        <span>下次使用本帐号访问，可以继续访问你的个人数据</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="logout">退出</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
  <div class="user-center-con">
    <div class="user-center-avatar">
      <div class="top-line"><span>欢迎使用WPS云服务</span></div>
      <!-- 头像 -->
      <div class="avatar-icon">
        <div class="user-avatar">
          <img src="@/assets/imgs/avatar.jpeg" alt="" class="img-circle" />
        </div>
        <el-upload
          action="#"
          list-type="picture"
          :limit="1"
          :auto-upload="false"
        >
          <div class="avatar-mask">
            <span>修改头像</span>
          </div>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
            </div>
          </template>
        </el-upload>
      </div>
      <!-- 账号 昵称 用户等级 账号评分-->
      <div class="avatar-username">
        <p>{{ account }}</p>
      </div>
      <div class="avatar-userid-level">
        <span class="avatar-userid">ID {{ id }}</span>
        <img src="@/assets/imgs/crown.png" class="img-crown" />
        <span class="member-button">普通用户</span>
      </div>
      <div class="safe-score">
        <img src="@/assets/imgs/shield.png" alt="" class="img-shield" />
        <span>当前帐号安全评分: 80分</span>
        <img src="@/assets/imgs/refresh.png" alt="" class="img-refresh" />
      </div>
    </div>
    <!-- 修改账号 -->
    <div class="user-info-box">
      <div class="line-top">
        <span>使用真实账号，让工作伙伴认识你</span>
      </div>
      <div class="nick-name" v-show="isShow">
        <div class="nick-name-text">{{ account }}</div>
        <div class="nick-name-reset">
          <el-button
            text
            @click="modify"
            style="color: #2e68f8; margin-right: -15px; font-size: 16px"
            >修改</el-button
          >
        </div>
      </div>
      <div class="nick-name" v-show="!isShow">
        <div class="nick-name-text">
          <el-input v-model="newAccount"></el-input>
        </div>
        <div class="nick-name-reset">
          <el-button @click="cancelChange">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </div>
      </div>
    </div>
    <!-- 查看个人信息 -->
    <div class="user-info-box">
      <div class="line-top">
        <span>查看个人信息文件</span>
      </div>
      <div class="nick-name">
        <div class="nick-name-text">个人信息查询</div>
        <div class="nick-name-reset" @click="getUserInfo">
          <el-button
            text
            @click="getdialogVisible = true"
            style="color: #2e68f8; margin-right: -15px; font-size: 16px"
            >查看</el-button
          >
          <el-dialog
            v-model="getdialogVisible"
            title="查看个人信息"
            width="30%"
          >
            <el-form>
              <el-form-item label="用户ID">
                <el-input v-model="id" />
              </el-form-item>
              <el-form-item label="账号">
                <el-input v-model="account" />
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="nickname" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="password" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="getdialogVisible = false"
                  >返回</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="user-info-box">
      <div class="line-top">
        <span>安全设置，下次登录将使用新密码</span>
      </div>
      <div class="nick-name">
        <div class="nick-name-text">修改密码</div>
        <div class="nick-name-reset">
          <el-button
            text
            @click="resetpwddialogVisible = true"
            style="color: #2e68f8; margin-right: -15px; font-size: 16px"
            >修改</el-button
          >
          <el-dialog v-model="resetpwddialogVisible" title="修改密码">
            <el-form ref="pwdRef" :rules="pwdRules">
              <el-form-item label="旧密码" prop="password">
                <el-input
                  v-model="password"
                  type="password"
                  placeholder="旧密码"
                  show-password
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                <el-input
                  v-model="newPwd"
                  type="password"
                  placeholder="新密码"
                  show-password
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPwd">
                <el-input
                  v-model="confirmPwd"
                  type="password"
                  placeholder="确认密码"
                  show-password
                  autocomplete="off"
                />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="resetpwddialogVisible = false"
                  >取消</el-button
                >
                <el-button type="primary" @click="confirmPwdValidate"
                  >确定</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- 删除账号 -->
    <div class="user-info-box">
      <div class="line-top">
        <span>删除所有数据,永久注销WPS帐号</span>
      </div>
      <div class="nick-name">
        <div class="nick-name-text">永久删除帐号</div>
        <div class="nick-name-reset">
          <el-button
            text
            @click="deletedialogVisible = true"
            style="color: #e96350; margin-right: -15px; font-size: 16px"
            >注销</el-button
          >
          <el-dialog v-model="deletedialogVisible" title="注销">
            <span>此操作将删除所有数据,永久注销WPS帐号</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="deletedialogVisible = false">取消</el-button>
                <el-button type="primary" @click="deleteAcconut"
                  >确定</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer-container">
      <span>遇到帐号问题？请前往</span>
      <a href="https://account.wps.cn/help" target="_blank">帮助中心</a>
      <img src="@/assets/imgs/rocket.png" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { UserService } from "@/api/index";
import { ICancelStarReq } from "@/types/request";
import { ElMessage } from "element-plus";
import { useFormStore } from "@/store/index";
import { storeToRefs } from "pinia";
import type { FormInstance } from "element-plus";

const store = useFormStore();
const router = useRouter();
const { account, pwd, password, id, nickname, ctime, utime, status } =
  storeToRefs(store);
const newAccount = ref(account.value);
const newPwd = ref();
const confirmPwd = ref();
const pwdRef = ref<FormInstance>();
// 设置对话框初始状态
const dialogVisible = ref(false);
const deletedialogVisible = ref(false);
const resetpwddialogVisible = ref(false);
const getdialogVisible = ref(false);
const imgdialogVisible = ref(false);
const imageUrl = ref("");

// 账号框显示初始状态
let isShow = ref(true);
//密码正则表达式
let reg =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/;

let str = RegExp(
  "^(?![A-Za-z]+$)(?![A-Z\\d]+$)(?![A-Z\\W_]+$)(?![a-z\\d]+$)(?![a-z\\W_]+$)(?![\\d\\W_]+$)\\S{8,}$"
);

const cancel: ICancelStarReq = reactive({
  id: "",
});

onMounted(() => {
  const { headerVisible } = storeToRefs(store);
  headerVisible.value = false;
});

onUnmounted(() => {
  const { headerVisible } = storeToRefs(store);
  headerVisible.value = true;
});

//返回主页
const toHome = () => {
  router.push({
    path: "/home",
  });
};

//退出账号
const logout = async () => {
  try {
    const res = await UserService.logout(cancel);
    account.value = "";
    router.push({
      path: "/",
    });
  } catch (error) {
    ElMessage({
      message: error.msg,
      type: "warning",
    });
  }
};

//修改用户名
const modify = () => {
  isShow.value = !isShow.value;
  ElMessage({
    message: "修改账号后需要重新登录",
    type: "warning",
  });
};
const confirm = async () => {
  if (newAccount.value !== account.value) {
    await UserService.changeAccount({
      account: account.value,
      newAccount: newAccount.value,
    });
    account.value = newAccount.value;
    isShow.value = !isShow.value;
    router.push("/");
  }
  isShow.value = !isShow.value;
};
const cancelChange = () => {
  newAccount.value = account.value;
  isShow.value = !isShow.value;
};

//查看用户信息
const getUserInfo = async () => {
  try {
    const res = await UserService.getInfo();
    const { account, pwd, id, nickname, ctime, utime, status } =
      res.data.data.user;
    store.setUserInfo(account, pwd, id, nickname);
  } catch (error) {
    console.log(error);
  }
};

// 修改密码
const resetPwd = async () => {
  try {
    await UserService.changePwd({
      account: account.value,
      newPwd: newPwd.value,
    });
    password.value = newPwd.value;
  } catch (error) {
    console.log(error);
  }
};
//密码校验规则
// 新密码验证
const newPwdValidate = (rule: any, value: any, callback: any) => {
  if (newPwd.value === "") {
    callback(new Error("请输入新密码"));
  } else if (!reg.test(newPwd.value) || !reg.test(confirmPwd.value)) {
    callback(new Error("密码为8-16位大小写字母、数字或符号3种组合"));
  } else {
    callback();
  }
};
// 确认新密码验证
const confirmPwdValidate = (rule: any, value: any, callback: any) => {
  if (confirmPwd.value === "") {
    callback(new Error("请确认密码"));
  } else if (confirmPwd.value !== newPwd.value) {
    callback(new Error("两次密码不一致"));
  } else {
    resetPwd();
    resetpwddialogVisible.value = false;
  }
};
const pwdRules = reactive({
  newPwd: [{ validator: newPwdValidate, trigger: "blur" }],
  comfirmPwd: [{ validator: confirmPwdValidate, trigger: "blur" }],
});

//删除账号
const deleteAcconut = async () => {
  try {
    await UserService.logoff({ account: account.value });
    account.value = "";
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="css" scoped>
.user-center-header {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background: #fafafa;
  box-shadow: 0 1px 0 0 #dbdbdb;
  font-size: 14px;
  color: #484848;
}
.user-center-wps {
  font-weight: 700;
  padding-left: 10px;
  margin-right: 4px;
}
.user-center-logout {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  max-width: 910px;
  margin-right: auto;
  margin-left: auto;
}
.logout {
  padding: 0 20px;
  margin: 16px 0;
  font-size: 12px;
  color: #969696;
  cursor: pointer;
}
.user-center-con {
  max-width: 910px;
  min-width: 650px;
  margin-right: auto;
  margin-left: auto;
}
.user-center-avatar {
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  padding-bottom: 24px;
  border: 1px solid #e7e9eb;
  border-radius: 2px;
  position: relative;
  background: #fff url(//qn.cache.wpscdn.cn/s1/avatar-bg.7d147f4.png) no-repeat
    100% 100%;
}
.top-line {
  text-align: right;
  margin: 16px 23px 0 0;
  position: relative;
}
.top-line span {
  font-size: 12px;
  line-height: 12px;
  color: #afafaf;
  letter-spacing: -0.29px;
}
/* 头像盒子 */
.avatar-icon {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: auto;
  padding-top: 16px;
  cursor: pointer;
}
.avatar-icon .user-avatar {
  position: absolute;
  width: 80px;
  height: 80px;
  margin: auto;
  border-radius: 50%;
}
.avatar-icon:hover .avatar-mask {
  display: block;
}
.el-upload-list__item-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
:deep(.el-upload-list) {
  margin: 0;
}
:deep(.el-upload-list__item) {
  border: none;
  padding: 0;
  margin: 0;
  margin-top: -18px;
}
/* 遮罩层 */
.avatar-mask {
  top: 17px;
  left: 0px;
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  display: none;
}
/* 遮罩层文字 */
.avatar-mask span {
  position: absolute;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: #fff;
  letter-spacing: -0.34px;
  font-size: 14px;
  z-index: 999;
  margin: 30px 12px;
  font-weight: 700;
}
/* 鼠标经过遮罩层 */
.avatar-icon .img-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 0;
}
.img-shield {
  width: 20px;
  margin-right: 5px;
}

.img-crown {
  width: 15px;
  margin: 0 5px;
}
.img-refresh {
  width: 15px;
  margin-left: 10px;
}
.img-arrow {
  width: 15px;
  cursor: pointer;
}

.avatar-username {
  margin: 12px 0 8px;
  text-align: center;
}
.avatar-username p {
  font-weight: 700;
  font-size: 16px;
  color: #383838;
  letter-spacing: 0;
}
.avatar-userid-level {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 16px;
  font-size: 12px;
}
.avatar-userid {
  width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 5px;
  border-right: 2px solid #e9e9e9;
}
.safe-score {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  margin-top: 12px;
  padding: 0 12px;
  line-height: 28px;
  font-size: 12px;
  color: #666;
  border: 1px solid #e7e9eb;
  border-radius: 14px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}
.user-info-box {
  background: #fff;
  border: 1px solid #e7e9eb;
  border-radius: 2px;
  margin-top: 12px;
  padding: 0 30px;
}
.line-top {
  margin-top: 30px;
}
.line-top span {
  font-size: 14px;
  color: #969696;
  letter-spacing: -0.34px;
}
.nick-name {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 30px;
  line-height: 32px;
}
.nick-name-reset {
  color: #2e68f8;
  cursor: pointer;
}
.footer-container {
  text-align: center;
  padding-bottom: 24px;
  margin-top: 15px;
}
.footer-container span {
  font-size: 12px;
  color: #afafaf;
}
.footer-container a {
  font-size: 12px;
  color: #2e68f8;
}
.footer-container img {
  vertical-align: middle;
  margin-left: 3.2px;
  width: 15px;
}
a {
  text-decoration: none;
  outline: none;
}

.bottom-line {
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  margin-top: -10px;
  margin-bottom: 20px;
}

/* 上传头像样式 */
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  /* border: 1px dashed red; */
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.avatar-uploader {
  border: 1px dashed #e9e9e9;
}

.el-icon.avatar-uploader-icon {
  font-size: 20px;
  /* color: #8c939d; */
  color: #e9e9e9;
  width: 100px;
  height: 100px;
  text-align: center;
}
/* 重写element-plus样式 */
:deep(.el-upload__tip) {
  padding-left: 15px;
  color: rgb(233, 88, 88);
}
:deep(.el-dialog) {
  width: 400px;
}
:deep(.el-dialog__header) {
  width: 90%;
  padding: 30px 0;
  margin: 0 20px;
  border-bottom: 1px solid #e9e9e9;
}
:deep(.el-form-item__label) {
  width: 70px;
}
:deep(.el-input) {
  width: 300px;
}
</style>
