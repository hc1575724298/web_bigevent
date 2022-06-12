/*
 * @Descripttion: 
 * @version: 
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-06-12 15:10:09
 * @LastEditors: sj
 * @LastEditTime: 2022-06-12 19:30:35
 */
$(function () {
  const form = layui.form
  // 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务器
  const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: "", // 文章分类的 Id
    state: "", // 文章的发布状态
  };
  // 获取文章列表数据
  const initTable = () => {
    $.ajax({
      type: 'GET',
      url: "/my/article/list",
      data: q,
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取文章列表失败！")
        // 使用模板引擎渲染页面的数据
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
        // 调用渲染分页的方法
        renderPage(res.total)
      }
    })
  }

  //初始化文章分类
  const initCate = () => {
    $.ajax({
      type: 'GET',
      url: "/my/article/cates",
      success: res => {
        // console.log(res);
        if (res.status !== 0) return layer.msg("获取分类数据失败！")
        const htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }
    })
  }
  // 筛选功能
  $('#form-search').submit((e) => {
    e.preventDefault()
    q.cate_id = $('[name=cate_id]').val()
    q.state = $('[name=state]').val()
    initCate()
  })
  // 分页函数
  const renderPage = (total) => {
    layui.laypage.render({
      elem: 'pageBox', // 分页容器的 Id
      count: total, // 总数据条数
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum,// 设置默认被选中的分页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      // 分页发生切换的时候，触发 jump 回调
      // 执行render函数时就会执行（首次加载）
      // 切换分页时也会执行

      jump: (obj, first) => {
        // console.log(obj);
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        // 首次加载时不去执行 inittable
        console.log(first);
        if (!first) {
          initTable()
        }

      }
    })
  }
  //删除文章  通过事件委托
  $('tbody').on('click', '.btn-delete', function () {
    const btnNum = $('.btn-delete').length
    const id = $(this).attr('data-id')
    layer.confirm('Are you sure you want to delete', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'GET',
        url: '/my/article/delete/' + id,
        success: res => {
          if (res.status !== 0) return layer.msg('删除文章失败！')
          layer.msg('删除文章成功！')
          if (btnNum === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
          layer.close(index)

        }
      })
    })
  })
  initTable()
  initCate()
  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补零的函数
  function padZero (n) {
    return n > 9 ? n : '0' + n
  }
})
