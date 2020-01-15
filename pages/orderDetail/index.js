const app = getApp()
Page({
  data: {
    order: {
      "order_id": 8,
      "order_number": "U201806221543557657",
      "status": 3,
      "num": 1,
      "pay_price": "0.01",
      "pay_time": 1529921469,
      "discount_id": 0,
      "discount_money": "0.00",
      "total_price": "0.01",
      "macno": "867732032893661",
      "goods": [

      ],
      "mobile": ""
    },
    form: {
      api_name: "shopOrderDetail",
      order_id: 0,
      token: app.getToken()
    }
  },

  onLoad: function (e) {
    const _this = this
    console.log(e)
    _this.setData({
      "form.order_id": e.id
    })
    _this.getOrder()
  },

  onShow: function () {
    const _this = this

  },
  getOrder: function () {
    const _this = this;
    app.wxRequest('/wxsite/Shop/api', _this.data.form, function (res) {
      wx.hideLoading()
      if (res.data.code == 1) {
        _this.setData({
          'order': res.data.data
        })
      } else {
        app.tools.toast(res.data.msg, "none")
      }
    })
  },
})