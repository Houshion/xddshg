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
        {
          "price": "0.01",
          "num": 1,
          "title": "冰露",
          "img": "http://gdsgshg.app.xiaozhuschool.com/public///uploads/imgs/20180620/aadbc9e90554ea54aaa0ceba6106f64c.png"
        },
        {
          "price": "0.01",
          "num": 1,
          "title": "冰露",
          "img": "http://gdsgshg.app.xiaozhuschool.com/public///uploads/imgs/20180620/aadbc9e90554ea54aaa0ceba6106f64c.png"
        }
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
    let orderId = e.id;
    _this.getOrder(orderId)
    _this.setData({
      "form.order_id": 8
      // "form.order_id": orderId
    })
  },

  onShow: function () {
    const _this = this

  },
  getOrder: function () {
    const _this = this;
    app.wxRequest('/wxsite/Shop/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data)
      }
    })
  },
})