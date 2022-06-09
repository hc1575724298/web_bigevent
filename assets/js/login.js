/*
 * @Descripttion: 
 * @version: 
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-06-09 09:55:33
 * @LastEditors: sj
 * @LastEditTime: 2022-06-09 16:01:26
 */
$(function () {
  // 点击切换 登陆与注册
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 现引入 form 来自 layui
  const form = layui.form
  //自定义校验规则
  form.verify({
    // 数组方式
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 函数方式
    repwd: (value) => {
      // 1.先获取密码框的值
      const pwd = $('.reg-box [name=password]').val()
      //2. 判断两次密码是否一致
      if (pwd !== value) return '两次密码不一致'
    }
  })

  // const baseUrl = 'http://www.liulongbin.top:3007'
  // 监听表单提交事件，发送注册请求
  $('#form_reg').submit((e) => {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name="username"]').val(),
        password: $('#form_reg [name="password"]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功')
        $('#link_login').click()
      }
    })
  })
  // 监听登陆页面
  $('#form_login').submit(function (e) {
    e.preventDefault()
    console.log($(this).serialize());
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        // console.log(res);
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // 1.把 token 存入本地
        localStorage.setItem('token', res.token)
        //2. 登陆成功，跳转到首页
        location.href = '/index.html'
      }
    })
  })
})