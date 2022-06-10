<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <HeaderNav />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-button type="primary" class="aside-btn" @click="newForm"
            ><strong>+</strong> 新建表单</el-button
          >
          <el-menu
            router
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1">
              <el-icon>
                <Tickets />
              </el-icon>
              <span>我创建的</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <EditPen />
              </el-icon>
              <span>我填写的</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <CopyDocument />
              </el-icon>
              <span>分享给我的</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>我创建的</span>
                  <div class="card-btn">
                    <el-button
                      @click.stop="showStar"
                      type="primary"
                      :icon="Star"
                      text
                      >仅展示星标</el-button
                    >
                  </div>
                </div>
              </template>
              <div v-if="resData.length !== 0">
                <el-table
                  :data="resData"
                  style="width: 100%"
                  @row-click="writeForm"
                >
                  <el-table-column
                    prop="title"
                    label="表单名称"
                    width="180"
                    align="center"
                  />
                  <el-table-column
                    prop="ctime"
                    label="创建时间"
                    width="200"
                    align="center"
                  />
                  <el-table-column
                    prop="status"
                    label="状态"
                    width="200"
                    align="center"
                  />
                  <el-table-column
                    label=""
                    prop="isStar"
                    width="200"
                    align="center"
                  >
                    <template #default="scope">
                      <el-icon
                        :style="scope.row.isStar == false ? '' : 'color:yellow'"
                        @click.stop="changColor(scope.row)"
                      >
                        <Star />
                      </el-icon>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="操作"
                    width="350"
                    align="center"
                  >
                    <template #default="scope">
                      <el-button
                        v-show="scope.row.status == '草稿'"
                        size="small"
                        plain
                        @click.stop="relForm(scope.row.id)"
                        >发布
                      </el-button>
                      <el-button
                        v-show="scope.row.status == '收集中' || '已结束'"
                        size="small"
                        type="warning"
                        plain
                        @click.stop="shareForm(scope.row.id)"
                        >分享
                      </el-button>
                      <el-button
                        v-show="scope.row.status == '收集中' || '已结束'"
                        size="small"
                        type="success"
                        plain
                        @click.stop="watchRes(scope.row.id)"
                        >查看结果
                      </el-button>
                      <el-button
                        v-show="scope.row.status == '收集中'"
                        size="small"
                        type="info"
                        plain
                        @click.stop="stopForm(scope.row.id)"
                        >停止
                      </el-button>
                      <el-button
                        size="small"
                        type="danger"
                        plain
                        @click.stop="deleteForm(scope.row.id)"
                        >删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-else>
                <el-button class="createBtn" type="primary" @click="newForm"
                  >+创建表单</el-button
                >
              </div>
            </el-card>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftBold, ArrowDown, SetUp } from '@element-plus/icons-vue'
import { ref, reactive, onBeforeMount, onMounted, watchEffect } from 'vue'
import { ICancelStarReq, IListReq, IGetFrom } from '../types/request'
import { ElMessage } from 'element-plus'
import { UserService, ListService, FormService } from '../api/index'
import { useFormStore } from '../store/index'
import { storeToRefs } from 'pinia'
import { Star } from '@element-plus/icons-vue'
import HeaderNav from '@/components/HeaderNav.vue'

// 刷新时缓存活跃菜单
const matched = useRoute().matched
const route = matched[matched.length - 1].path
const store = useFormStore()
const router = useRouter()
const dialogVisible = ref(false)
const { account, password, headerVisible, avatarPath } = storeToRefs(store)

const cancel: ICancelStarReq = reactive({
  id: '',
})
const form: IGetFrom = reactive({
  id: 'fa23cf6c-21c1-46e2-a478-529216f60eb6',
})

const starStatus = reactive({
  id: '',
  isStar: true,
})

const input = ref('')
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const goBack = () => {
  router.push('/home')
}

const changColor = async (row: any) => {
  row.isStar = !row.isStar
  const res = await ListService.formStar(row.id, row.isStar)
}

const relForm = async (id: string) => {
  const res = await ListService.release(id)
  resData.value.forEach((form) => {
    if (form.id === res.data.data.forms.id) {
      form.status = '收集中'
    }
  })
}

const stopForm = async (id: string) => {
  const res = await ListService.stopCollect(id)
  resData.value.forEach((form) => {
    if (form.id === res.data.data.forms.id) {
      form.status = '已结束'
    }
  })
}

const showStar = async () => {
  const res = await ListService.showOnlyStar()
  resData.value = res.data.data.forms
}

const deleteForm = async (id: string) => {
  const res = await ListService.delForm(id)
  resData.value.forEach((form, index) => {
    if (form.id === res.data.data.form.id) {
      resData.value.splice(index, 1)
    }
  })
}

const watchRes = (id: string) => {
  store.$patch((state) => {
    state.formId = id
  })
  router.push('/formStaticsDetail/formInfo/formStatics')
}

const shareForm = (id: string) => {
  store.$patch((state) => {
    state.formId = id
  })
  router.push('/formStaticsDetail/formShare')
}
const writeForm = (row: any) => {
  store.$patch((state) => {
    state.formId = row.id
  })
  if (row.status === '收集中') {
    router.push(`/writeform/${row.id}`)
  }
}

const releaseForm = () => {}

const handleCommand = async (command: string) => {
  if (command == 'logout') {
    dialogVisible.value = true
  }
  if (command == 'usercenter') {
    headerVisible.value = false
    router.push('/usercenter')
  }
}
const resData = ref([])
// const resForm = ref({});
onMounted(async () => {
  try {
    const res = await ListService.formList()
    resData.value = res.data.data.forms
    resData.value = resData.value.filter((form) => form.status !== 1)
    for (let form of resData.value) {
      form.ctime = dateFormat(form.ctime, FormatsEnums.YMDHIS)
      if (form.status === 2) {
        form.status = '草稿'
      } else if (form.status === 3) {
        form.status = '收集中'
      } else if (form.status === 4) {
        form.status = '已结束'
      }
    }
  } catch (error) {
    ElMessage({
      message: error.msg,
      type: 'warning',
    })
  }
})

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

const newForm = () => {
  router.push({
    name: 'createForm',
  })
}

enum FormatsEnums {
  YMD = 'Y-m-d',
  YMDHIS = 'Y-m-d H:i:s',
  _YMD = 'Y年m月d日',
  _YMDHIS = 'Y年m月d日 H时i分',
}

const dateFormat = function (timestamp: number, formats: FormatsEnums): string {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分

  const zero = function (value: number): string | number {
    if (value < 10) {
      return '0' + value
    }
    return value
  }

  const myDate = timestamp ? new Date(timestamp) : new Date()

  const year = myDate.getFullYear()
  const month = zero(myDate.getMonth() + 1)
  const day = zero(myDate.getDate())

  const hour = zero(myDate.getHours())
  const minite = zero(myDate.getMinutes())
  const second = zero(myDate.getSeconds())

  return formats.replace(/Y|m|d|H|i|s/gi, function (matches: string): any {
    return {
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second,
    }[matches]
  })
}
</script>

<style lang="css" scoped>
.el-aside {
  border-top: 1px solid #e9e9eb;
  background-color: #fff;
  border-right: 1px solid #e9e9eb;
}

.el-header {
  padding: 0;
  background-color: #fff;
  height: 56px;
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

.createBtn {
  margin-top: 200px;
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
</style>
