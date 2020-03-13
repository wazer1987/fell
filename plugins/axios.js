import Vue from 'vue'

import axios from 'axios'
import { MessageBox } from 'element-ui'
const server = axios.create({
  timeout: 5000,
  baseURL: '/api'
})
const TOKEN_KEY = 'waze'
// 配置了axios的请求拦截 和响应拦截
export default ({ store, redirect }) => {
  server.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem(TOKEN_KEY)
      if (token) {
        config.headers.common.Authorization = 'Bearer ' + token
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )
  server.interceptors.response.use(
    (response) => {
      // data是后端给你返回的数据 config是后端给你返回的接口信息其中我们可以用他来来接是部分接口
      // 然后对数据进行处理
      const { data, config } = response
      // 这里的逻辑就是如果你请求成功 并且你请求的接口是登录的接口 那么我就存token
      if (data.code === 0) {
        if (config.url === '/user/login') {
          localStorage.setItem(TOKEN_KEY, data.data.token)
        }
      } else if (data.code === -666) {
        MessageBox.confirm('登录过期了', '过期', {
          confirmButtonText: '登录',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          localStorage.removeItem(TOKEN_KEY)
          redirect({ path: '/login' })
        })
        // 如果状态码是-666那么说明token过期了要换取token
      }
      // console.log(data, config)
      // console.log('响应拦截', response)
      return data
    },
    (err) => {
      return Promise.reject(err)
    }
  )
}

Vue.prototype.$http = server
export const http = server
