/*
 * @Descripttion: 
 * @version: 
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-06-11 18:43:00
 * @LastEditors: sj
 * @LastEditTime: 2022-06-12 10:24:42
 */
$(function () {
  const form = layui.form
  // 获取文章列表
  const initArtCate = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取文章列表失败')
        // console.log(res);

        const htmlStr = template('tpl-table', res)
        $('tbody').empty().html(htmlStr)
      }
    })
  }
  // 添加图书按钮绑定事件
  let indexAdd = null
  $('#btnAddCate').click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $('#dialog-add').html(),
    });
  })

  // 添加文章分类 通过事件委托
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("新增分类失败！")
        layer.msg("新增分类成功！")
        // 重新渲染列表
        initArtCate()
        // 关闭弹窗
        layer.close(indexAdd)
      }
    })
  })
  initArtCate()
  // 为编辑按钮绑定事件  事件委托
  let indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    const id = $(this).attr('data-id')
    $.ajax({
      type: 'GET',
      url: "/my/article/cates/" + id,
      success: (res) => {
        console.log(id);
        if (res.status !== 0) return layer.msg('获取分类信息失败')
        form.val('form-edit', res.data)
      }
    })
  })

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新分类数据失败！')
        layer.msg('更新分类数据成功！')
        // 重新渲染列表
        initArtCate()
        // 关闭弹窗
        layer.close(indexEdit)
      }
    })
  })
  // 删除按钮
  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id')
    layer.confirm(
      '确认删除该文章分类',
      { icon: 3, title: '提示' },
      (index) => {
        $.ajax({
          type: 'GET',
          url: "/my/article/deletecate/" + id,
          success: (res) => {
            console.log(res);
            if (res.status !== 0) return layer.msg("删除分类失败！");
            layer.msg("删除分类成功！");
            // 重新渲染列表
            initArtCate()
            // 关闭弹窗
            layer.close(index)
          }
        })
      }
    )
  })
})