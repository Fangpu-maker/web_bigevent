$(function() {
  getUserInfo();

  var layer = layui.layer;
  $("#btnLogout").on("click", function() {
    //   退出框
    layer.confirm("确定退出登录？", { icon: 3, title: "提示" }, function(
      index
    ) {
      localStorage.removeItem("token");
      location.href = "/login.html";
      layer.close(index);
    });
  });
});
// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || ""
    // },
    success: function(res) {
      //   console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      renderAvatar(res.data);
    }
    // // 不论成功还是失败，最终都会调用complete回调函数
    // complete: function(res) {
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     // 强制清空后台
    //     localStorage.removeItem("token");
    //     // 强制跳转到登录界面
    //     location.href = "/login.html";
    //   }
    // }
  });
}
//渲染用户头像
function renderAvatar(user) {
  // 获取用户的名称
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  if (user.user_pic !== null) {
    $(".layui-nav-img")
      .attr("src", user.user_pic)
      .show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img")
      .attr("src", user.user_pic)
      .hide();
    var first = name[0].toUpperCase();
    $(".text-avater")
      .html(first)
      .show();
  }
}
