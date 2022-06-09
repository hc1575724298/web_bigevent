/*
 * @Descripttion: 
 * @version: 
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-06-09 15:58:55
 * @LastEditors: sj
 * @LastEditTime: 2022-06-09 16:04:01
 */
// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((options) => {
  options.url = 'http://www.liulongbin.top:3007' + options.url
})
// 请求拦截器
// 响应拦截器