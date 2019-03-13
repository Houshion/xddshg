const app = getApp()
Page({
  data: {
    replenishList: [
      {
        "order_id": 1, //补货id
        "order_number": "B201805193414", //设备补货编号
        "close_time": 1526696251, //补货时间
        "macno": "4554524549"//设备编号
      },
      {
        "order_id": 1, //补货id
        "order_number": "B201805193414", //设备补货编号
        "close_time": 1526696251, //补货时间
        "macno": "4554524549"//设备编号
      },
      {
        "order_id": 1, //补货id
        "order_number": "B201805193414", //设备补货编号
        "close_time": 1526696251, //补货时间
        "macno": "4554524549"//设备编号
      },
    ],
    form: {
      api_name: "staffReplenish",
      page: 1,
      pageseze: 10,
      token: app.getToken()
    },
    totalPage: 10,
    loading: false
  },
  onReachBottom() {
    if (this.data.form.page < this.data.totalPage) {
      this.getList(this.data.form.page + 1)
    }
  },

  onLoad: function (e) {
    const _this = this
    let type = app.getUserType();
    switch (type) {
      case 1:
        _this.setData({
          'form.api_name': "shopReplenish"
        })
        break;
      case 2:
        _this.setData({
          'form.api_name': "staffReplenish"
        })
        break;
    }
    _this.getList(1);
  },

  onShow: function () {
    const _this = this

  },
  getList: function (pageNo) {
    const _this = this;
    _this.loading = true
    console.log(pageNo)
    _this.setData({
      'form.page': pageNo,     //当前的页号
    })
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data)
        _this.loading = false
      }
    })
  },
})