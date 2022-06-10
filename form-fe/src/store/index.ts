import { defineStore } from 'pinia'
import { Names } from './store-names'

export const useFormStore = defineStore(Names.FORM, {
  state: () => {
    return {
      avatarPath: '',
      account: '',
      pwd: '',
      password: '',
      id: '',
      nickname: '',
      ctime: '',
      utime: '',
      status: '',
      headerVisible: true,
      // 协议选中初始化状态
      checked: false,
      formId: '',
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'form',
        paths: [
          'account',
          'pwd',
          'password',
          'checked',
          'avatarPath',
          'id',
          'formId',
        ],
      },
    ],
  },
  // 两种写法
  // 当前的函数是箭头函数，第一个参数是state
  // 当前的函数是普通函数，也可以通过this获取到当前的实例，注意：要是使用ts的话，当前的函数要有返回值类型
  getters: {
    newName(): string {
      return this.name
    },
    getUserAge(): number {
      return this.user.age
    },
    getAvatar(): string {
      return this.avatar
    },
    getHeaderVisible() {
      return this.headerVisible
    },
    getAccount() {
      return this.account
    },
  },
  actions: {
    //账号和密码存到状态管理器
    setUserInfo(
      account: string,
      pwd?: string,
      id?: string,
      nickname?: string,

      ctime?: number,
      utime?: number,
      status?: number
    ) {
      this.account = account
      this.pwd = pwd
      this.id = id
      this.nickname = nickname
    },
    setPassword(password: string) {
      this.password = password
    },
    setPwd(pwd: string) {
      this.pwd = pwd
    },
    setId(id: string) {
      this.id = id
    },
  },
})

/**
 * 封装操作localstorage本地存储的方法
 */
export const storage = {
  //存储
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  //取出数据
  get<T>(key: string) {
    const value = localStorage.getItem(key)
    if (value && value != 'undefined' && value != 'null') {
      return <T>JSON.parse(value)
    }
  },
  // 删除数据
  remove(key: string) {
    localStorage.removeItem(key)
  },
}

/**
 * 封装操作sessionStorage本地存储的方法
 */
export const sessionStorage = {
  //存储
  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  //取出数据
  get<T>(key: string) {
    const value = window.sessionStorage.getItem(key)
    if (value && value != 'undefined' && value != 'null') {
      return JSON.parse(value)
    }
    return null
  },
  // 删除数据
  remove(key: string) {
    window.sessionStorage.removeItem(key)
  },
}
