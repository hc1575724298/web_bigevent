/*
 * @Descripttion: 
 * @version: 
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-06-09 15:58:55
 * @LastEditors: sj
 * @LastEditTime: 2022-06-11 10:43:51
 */

// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// 请求拦截器
// 响应拦截器
$.ajaxPrefilter((options) => {
  //在请求之前拼接跟路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
  //注入 token
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token')
    }
  }

  // 权限校验
  options.complete = (res) => {
    // console.log(res);
    if (res.responseJSON.message === "身份认证失败！" && res.responseJSON.status === 1) {
      //1.强制清空 token
      localStorage.removeItem('token')
      // 2.跳转到登陆界面
      location.href = '/login.html'
    }
  }
})




