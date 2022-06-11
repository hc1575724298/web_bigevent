/*
 * @Descripttion: 
 * @version: 
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-06-11 14:40:26
 * @LastEditors: sj
 * @LastEditTime: 2022-06-11 15:29:26
 */
$(function () {
  const form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: (value) => {
      if (value === $('[name=oldPwd]').val()) return '新密码与旧密码不能相同'
    },
    rePwd: (value) => {
      if (value !== $('[name=newPwd]').val()) return '新密码要与确认密码相同'
    }
  })

  //更新密码
  $('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: "/my/updatepwd",
      data: $('.layui-form').serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('密码更新失败')
        layer.msg('密码更新成功')
        localStorage.removeItem('token')
        window.parent.location.href = '/login.html'

      }
    })
  })
})