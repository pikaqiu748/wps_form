import axios from 'axios'
import { showMessage } from './status' // 引入状态码文件
import { ElMessage } from 'element-plus' // 引入el 提示框

// 设置接口超时时间
axios.defaults.timeout = 60000

// 请求地址，这里是动态赋值的的环境变量,
// 这个设置，坑了我一天，因为代理已经设置好了要请求的代理地址，所以这里不用在设置baseURL
// axios.defaults.baseURL = import.meta.env.VITE_FORM_URL

// 也可以根据.env.development和.env.production中的ENV进行以下判断使用哪个url
// if (import.meta.env.ENV === 'development') {
//   api_base_url = '某个地址'
// } else if (import.meta.env.ENV === 'production') {
//   api_base_url = '另外一个地址'
// }

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
      token: '80c483d59ca86ad0393cf8a98416e2a1', // 这里自定义配置，这里传的是token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status) // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data)
    } else {
      ElMessage.warning('网络连接异常,请稍后再试!')
    }
  }
)

// 封装 GET POST 请求并导出
export function request(url = '', type = 'POST', params = {}) {
  //设置 url params type 的默认值
  return new Promise<any>((resolve, reject) => {
    let promise
    if (type.toUpperCase() === 'GET') {
      promise = axios({
        url,
        params,
      })
    } else if (type.toUpperCase() === 'POST') {
      promise = axios({
        method: 'POST',
        url,
        data: params,
      })
    }
    //处理返回
    promise
      ?.then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
