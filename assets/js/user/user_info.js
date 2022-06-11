/*
 * @Descripttion: 
 * @version: 
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-06-11 10:14:50
 * @LastEditors: sj
 * @LastEditTime: 2022-06-11 11:40:24
 */
$(function () {
  const form = layui.form
  // 自定义校验规则
  form.verify({
    nickname: value => {
      if (value.length > 6) return '昵称长度不能超过6个字符'
    }
  })

  //获取用户信息
  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取用户信息失败')
        layer.msg('获取用户信息成功')
        console.log(res);
        // 表单填充
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置按钮
  $('#btnReset').click(function (e) {
    e.preventDefault()
    initUserInfo()
  })

  // 更新用户信息
  $('.layui-form').click(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新用户信息失败')
        layer.msg('更新用户信息成功')
        // console.log(res);
        // 通知父页面 更新用户信息
        window.parent.getUserInfo()
      }
    })
  })
  initUserInfo()
})