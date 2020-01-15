const app = getApp()
Page({
  data: {
    orderMessage: {

    },
    form: {
      api_name: "ReplenishDetail",
      'order_id': '',
    },
    loading: false
  },

  onLoad: function (e) {
    const _this = this
    _this.setData({
      'form.order_id': e.id,
    })
    _this.getInit()
  },

  onShow: function () {
    const _this = this

  },
  getInit: function () {
    const _this = this;
    _this.setData({
      'loading': true
    })
    app.wxRequest('/wxsite/Shop/api_web', _this.data.form, function (res) {
      wx.hideLoading()
      console.log(JSON.stringify(res.data.data))
      if (res.data.code == 1) {
        _this.setData({
          'orderMessage': res.data.data,
          'loading': false
        })
      } else {
        app.tools.toast(res.data.msg, "none")
      }
    })
  },
})