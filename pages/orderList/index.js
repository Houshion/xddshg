const app = getApp()
Page({
  data: {
    orderList: [
      
    ],
    form: {
      api_name: "shopOrderList",
      page: 1,
      pageseze: 10,
      token: app.getToken()
    },
    loading: false
  },

  onLoad: function (e) {
    const _this = this
    console.log(this.data.form)
    _this.getList(1)
  },

  onReachBottom() {
    this.getList(this.data.form.page + 1)
  },
  getList: function (pageNo) {
    const _this = this;
    let list = [];
    if (pageNo == 1) {
      list == []
    } else {
      list = list.concat(_this.data.orderList)
    }
    _this.setData({
      'form.page': pageNo,     //当前的页号
      'loading': true
    })
    app.wxRequest('/wxsite/Shop/api', _this.data.form, function (res) {
      wx.hideLoading()
      if (res.data.code == 1) {
        let arr = list.concat(res.data.data)
        _this.setData({
          'loading': false,
          'orderList': arr
        })
      } else {
        app.tools.toast(res.data.msg, "none")
      }
    })
  },
  confirm: function () {
    wx.showToast({
      title: '补货成功',
      icon: 'success',
      duration: 2000
    })
  }
})