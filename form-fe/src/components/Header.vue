<template>
  <div class="el-header">
    <div class="header_height">
      <div class="el-page-header__content">
        <div class="logo">
          <div class="logo_img"><img :src="logo" /></div>
          <h1 class="logo_title">金山表单</h1>
        </div>
        <div class="content">
          <el-input
            :prefix-icon="Search"
            v-model="input"
            placeholder="搜索表单"
            class="input"
          />

          <el-dropdown
            size="small"
            type="primary"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <el-avatar :src="avatar"></el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="username">
                  <strong>{{ account }}</strong>
                </div>
                <el-dropdown-item command="usercenter">
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item command="logout"> 退出账号 </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="退出登录" width="40%">
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
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useFormStore } from "@/store/index";
import logo from "@/assets/imgs/logo.svg";
import Search from "@/components/Search.vue";
import { ref, reactive, onBeforeMount } from "vue";
import { ICancelStarReq, IListReq, IGetFrom } from "@/types/request";
import { ElMessage } from "element-plus";
import { UserService, ListService, FormService } from "@/api/index";
import { storeToRefs } from "pinia";
import avatar from "@/assets/imgs/avatar.jpeg";

// 刷新时缓存活跃菜单
const matched = useRoute().matched;
const route = matched[matched.length - 1].path;
const store = useFormStore();
const router = useRouter();
const dialogVisible = ref(false);
const { account, password, headerVisible, avatarPath } = storeToRefs(store);

const cancel: ICancelStarReq = reactive({
  id: "",
});
const form: IGetFrom = reactive({
  id: "055a16a3-726e-4750-a996-ba18cd4535dd",
});
const list: IListReq = reactive({
  isStar: true,
  offset: 0,
  limit: 0,
});

const input = ref("");

const handleCommand = async (command: string) => {
  if (command == "logout") {
    dialogVisible.value = true;
  }
  if (command == "usercenter") {
    headerVisible.value = false;
    router.push("/usercenter");
  }
};
const resData = ref([]);
const resForm = ref({});
// onBeforeMount(async () => {
//   try {
//     const res = await ListService.formList(list);
//     const forms = await FormService.get(form);
//     console.log("表单返回", forms);
//     resForm.value = forms.data.data.item;
//     console.log("成功请求", res);
//     resData.value = res.data.data.items;
//   } catch (error) {
//     console.log(error);
//     // ElMessage({
//     //   message: error.msg,
//     //   type: "warning",
//     // });
//   }
// });

const logout = async () => {
  try {
    const res = await UserService.logout(cancel);
    account.value = password.value = "";
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
</script>
<style lang="css" scoped>
.content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}

.header_height {
  height: 60px;
}

.input {
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 10px;
}

:deep(.el-page-header__content) {
  flex: 1;
  display: flex;
  height: 100%;
}

.page-header {
  border-bottom: 1px solid #e7e9eb;
}

.logo {
  width: 150px;
  display: flex;
  align-items: center;
  margin-top: -10px;
}

.logo_img {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 8px;
  width: 30px;
  height: 30px;
}

.logo_title {
  font-size: 18px;
  font-weight: 500;
  color: #3c414b;
}

.el-aside {
  border-top: 1px solid #e9e9eb;
  background-color: #fff;
  border-right: 1px solid #e9e9eb;
}

.el-header {
  background-color: #fff;
}

.common-layout {
  height: 100%;
}

.el-container {
  height: 100%;
}

.aside-btn {
  background-color: #1c88ed;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 20px;
  padding: 18px 40px;
  font-size: 16px;
}

.el-header {
  height: 50px;
}

.head-input {
  width: 500px;
  margin-top: 5px;
}

.el-card {
  height: 100%;
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5px;
}

.card-header span {
  font-size: 14px;
}

.text {
  font-size: 12px;
}

.item {
  margin-bottom: 18px;
}

.card-btn button {
  margin: 0;
  font-size: 12px;
  padding-right: 2px;
  padding-left: 2px;
}

.el-pagination {
  position: fixed;
  bottom: 25px;
  right: 30px;
}

.username {
  font-size: 15px;
  text-align: center;
  margin: auto;
  padding: 5px 0px;
  border-bottom: 1px solid #e9e9e9;
  width: 70px;
}

:deep(.el-dropdown-menu__item) {
  padding: 3px 24px;
  font-size: 12px;
}

.form-item {
  display: flex;
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  width: 100%;
  height: 60px;
  line-height: 60px;
}

.form-item .form-title {
  flex: 1;
}

.form-item .create-time {
  flex: 1;
}

.form-item .form-state {
  flex: 1;
}

.form-item .isStar {
  flex: 1;
}

.form-item .form-caozuo {
  flex: 2;
}
</style>
