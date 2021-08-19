//注意：每次调用$.get() 或 $.ajax() 的时候，
//会先调用 ajaxPrefiler 这个函数
//在这个函数中，可以拿到我们给AJAX提供的配置对象
$.ajaxPrefilter(function(options) {
  // 统一拼接根路径
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
  // console.log(options.url);

  // 统一设置headers请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || ""
    };
  }

  options.complete = function(res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 强制清空后台
      localStorage.removeItem("token");
      // 强制跳转到登录界面
      location.href = "/login.html";
    }
  };
});
