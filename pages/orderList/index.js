const app = getApp()
Page({
  data: {
    orderList: [
      {
        "order_id": 8,
        "order_number": "U201806221543557657",
        "status": 3,
        "num": 1,
        "pay_price": "0.01",
        "pay_time": 1529921469,
        "total_price": "0.01",
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
      },
    ],
    form: {
      api_name: "shopOrderList",
      page: 1,
      pageseze: 10,
      token: app.getToken()
    },
    totalPage: 10,
    loading: false
  },

  onLoad: function (e) {
    const _this = this
    console.log(this.data.form)
    _this.getList(1)
  },

  onReachBottom() {
    if (this.data.form.page < this.data.totalPage) {
      this.getList(this.data.form.page + 1)
    }
  },
  getList: function (pageNo) {
    const _this = this;
    _this.loading = true
    console.log(pageNo)
    _this.setData({
      'form.page': pageNo,     //当前的页号
    })
    app.wxRequest('/wxsite/Shop/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data)
        _this.loading = false
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