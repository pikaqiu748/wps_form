<template>
  <div class="headerbar">
    <div class="left-wrap">
      <div class="left-con">
        <div class="logo">
          <img src="@/assets/imgs/logo.svg" alt="" />
        </div>
        <h1 class="title">金山表单</h1>
      </div>
    </div>
    <div class="search-wrap">
      <div class="search-con">
        <span class="input-wrapper">
          <span class="input">
            <img src="@/assets/imgs/search.png" alt="" />
          </span>
          <input
            placeholder="搜索表单"
            class="ant-input"
            type="text"
            value
            v-model="input"
          />
        </span>
      </div>
    </div>
    <div class="right-wrap">
      <div class="dropdown">
        <a class="appcenter">
          <img src="@/assets/imgs/app store-fill.png" />
        </a>
      </div>
      <div class="notify">
        <img src="@/assets/imgs/message.png" alt="" />
      </div>
      <div class="line"></div>
      <div class="dropdown">
        <a class="little-program">
          <img src="@/assets/imgs/xiaochengxu.png" />
          <span>小程序</span>
        </a>
      </div>
      <div class="dropdown avatar">
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
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { useFormStore } from '@/store/index'
import { ref, reactive } from 'vue'
import { ICancelStarReq, IListReq, IGetFrom } from '@/types/request'
import { ElMessage } from 'element-plus'
import { UserService } from '@/api/index'
import { storeToRefs } from 'pinia'
import avatar from '@/assets/imgs/avatar.jpeg'

// 刷新时缓存活跃菜单
const matched = useRoute().matched
const store = useFormStore()
const router = useRouter()
const dialogVisible = ref(false)
const { account, password, headerVisible, avatarPath } = storeToRefs(store)

const cancel: ICancelStarReq = reactive({
  id: '',
})

const input = ref()

const handleCommand = async (command: string) => {
  if (command == 'logout') {
    dialogVisible.value = true
  }
  if (command == 'usercenter') {
    headerVisible.value = false
    router.push('/usercenter')
  }
}

const logout = async () => {
  try {
    const res = await UserService.logout(cancel)
    account.value = password.value = ''
    router.push({
      path: '/',
    })
  } catch (error) {
    ElMessage({
      message: error.msg,
      type: 'warning',
    })
  }
}
</script>
<style lang="css" scoped>
/* 左边 */
.headerbar {
  width: 100%;
  height: 56px;
  display: flex;
  border-bottom: 1px solid #e7e9eb;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 999;
  background: white;
  position: relative;
}
.left-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.left-con {
  line-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 30px;
  height: 30px;
}
.title {
  font-size: 18px;
  font-weight: 500;
  color: #3c414b;
  margin: 0.67em 0;
}
/* 搜索框 */
.search-wrap {
  width: 100%;
}
.search-con {
  max-width: 600px;
  position: relative;
  margin-left: 105px;
  margin-right: 24px;
}
.input-wrapper {
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  text-align: start;
}
.input {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  line-height: 0;
  transform: translateY(-50%);
  left: 12px;
}
.input img {
  width: 16px;
  height: 16px;
}
.ant-input {
  border-radius: 4px;
  height: 36px;
  width: 100%;
  letter-spacing: 0;
  outline: none;
  background-color: #f2f5fa;
  border: 1px solid #f2f5fa;
  resize: none;
  overflow: hidden;
  box-shadow: none !important;
  font-size: 12px;
  color: #949aae;
  padding-left: 36px;
  text-overflow: ellipsis;
  position: relative;
  text-align: inherit;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  display: inline-block;
  line-height: 1.5;
  background-image: none;
  transition: all 0.3s;
}
/* 右边 */
.right-wrap {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.dropdown {
  display: inline-block;
  position: relative;
}
.appcenter {
  width: 16px;
  height: 32px;
  margin-right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.appcenter img {
  width: 20px;
}
.notify {
  width: 16px;
  height: 32px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.notify img {
  width: 20px;
}
.line {
  width: 1px;
  height: 16px;
  background: #e7e9eb;
  margin-left: 24px;
}
.little-program {
  align-items: center;
  color: #626b84;
  display: flex;
}
.little-program img {
  width: 15px;
  margin-left: 20px;
}
.little-program span {
  font-size: 14px;
  padding-left: 4px;
  opacity: 0.8;
  position: relative;
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
:deep(.el-avatar--circle) {
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin-left: 24px;
  position: relative;
}
</style>
