import { request } from './axios'
import * as TYPE from '../types/request'

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
  // 登录
  static async login(params: TYPE.ILoginReq) {
    return request('/user/login', 'post', params)
  }
  // 注册
  static async register(params: TYPE.IRegisterReq) {
    console.log(params)
    return request('/user/register', 'post', params)
  }
  //退出登录
  static async logout(params: TYPE.ICancelStarReq) {
    return request('/user/logout', 'post', params)
  }

  //注销账号
  static async logoff(params: TYPE.ILogoffReq) {
    return request('/user/logoff', 'post', params)
  }
  // 头像url
  static async setAvatar(account: string, avatarPath: string) {
    return request('/user/avatar', 'post', { account, avatarPath })
  }

  //获取用户信息
  static async getInfo() {
    return request('/info/getInfo', 'get')
  }
  //设置用户信息
  static async setInfo(params: TYPE.ISetUserInfoReq) {
    return request('/info/setInfo', 'post', params)
  }
  //修改密码
  static async changePwd(params: TYPE.IChangePwdReq) {
    return request('/user/changePassWord', 'post', params)
  }
  // 修改用户名
  static async changeAccount(params: TYPE.IChangeAccount) {
    return request('/info/changeAccount', 'post', params)
  }
  //测试
  static async test() {
    return request('/user/test', 'get')
  }
}

/**
 * @description -封装Form类型的接口方法
 */
export class FormService {
  static async list() {
    return request('/form/listType', 'get')
  }
  // 创建表单
  static async create(params: TYPE.ICreateFormReq) {
    return request('/form/create', 'post', params)
  }

  // 获取表单
  static async get(params: TYPE.IGetFrom) {
    return request('/form/get', 'post', params)
  }

  //填写表单
  static async input(params: TYPE.IInputReq) {
    return request('/form/input', 'post', params)
  }
  // 获取一个表单所有填写详情
  static async getAllDetail(params: string) {
    return request(`/form/formResult/${params}`, 'get')
  }
  // 获取单个表单填写详情
  static async getOneDetail(params: string) {
    return request(`/form/detail/${params}`, 'post')
  }
}

/**
 * @description -封装Problem类型的接口方法
 */
export class ProblemService {
  // 获取基础题目类型
  static async listType() {
    return request('/problem/listType', 'get')
  }
  // 获取基础题目
  static async listBasic() {
    return request('/problem/listBasic', 'get')
  }
  // 获取收藏的题目
  static async listStar() {
    return request('/problem/listStar', 'post')
  }
  //收藏题目
  static async star(params: TYPE.IStarProblemReq) {
    return request('/problem/star', 'post', params)
  }
  //取消收藏题目
  static async unStar(params: TYPE.ICancelStarReq) {
    return request('/problem/cancelStar', 'post', params)
  }
}

export class ListService {
  // 获取列表
  static async formList() {
    return request('/form/allForms', 'get')
  }
  //修改Star状态
  static async formStar(formId: string, isStar: boolean) {
    return request('/form/star', 'post', {
      id: formId,
      isStar: isStar,
    })
  }
  // 删除表单
  static async delForm(formId: string) {
    return request('/form/deleteForm', 'post', {
      id: formId,
    })
  }
  // 仅展示staredform
  static async showOnlyStar() {
    return request('/form/showOnlyStar', 'get')
  }

  // 发布
  static async release(formId: string) {
    return request('/form/release', 'post', {id: formId})
  }

  // 结束
  static async stopCollect(formId: string) {
    return request('/form/stop', 'post',{id: formId})
  }
}
