

// 正式
// var rootDocment = 'https://yuanyueapi.yinchtv.com/Tran.aspx?';
// 测试
var rootDocment = 'http://yuanyuetestapi.yinchtv.com/Tran.aspx?';
// var rootDocment = 'http://10.0.120.57:2147/Tran.aspx'; 
 // var rootDocment = 'http://10.0.39.3:2147/Tran.aspx';

var that = this;

function postReq(data, cb) {
  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    url: rootDocment,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data,
    method: 'POST',
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data);
    },
    fail: function (res) {
      wx.hideLoading();
      // wx.navigateTo({
      //   // url: '/pages/defaultPage/defaultPage'
      // })
      wx.showModal({
        title: '网络错误',  
        content: '网络出错，请刷新重试',
        showCancel: false
      });
      return typeof cb == "function" && cb(false);
    }
  });
}
exports.postReq = postReq;
