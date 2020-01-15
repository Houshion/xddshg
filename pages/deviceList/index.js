const app = getApp()
Page({
  data: {
    deviceList: [
      // {
      //   "device_id": 28,
      //   "macno": "99acda74080abbc5",
      //   "address": "东莞市南城去",
      //   "inventory": "170",
      //   "status_name": ""
      // },
    ],
    form: {
      api_name: "getDevice",
      page: 1,
      pagesize: 10,
      token: app.getToken()
    },
    loading: false
  },
  onReachBottom() {
    this.getList(this.data.form.page + 1)
  },

  onLoad: function (e) {
    const _this = this
    _this.getList(1)
  },

  onShow: function () {
    const _this = this

  },

  getList(pageNo) {
    const _this = this;
    let list = [];
    if (pageNo == 1) {
      list == []
    } else {
      list = list.concat(_this.data.deviceList)
    }
    _this.setData({
      'form.page': pageNo,     //当前的页号
      'loading': true
    })
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      wx.hideLoading()
      if (res.data.code == 1) {
        let arr = list.concat(res.data.data)
        _this.setData({
          'deviceList': arr,
          'loading': false
        })
      } else {
        app.tools.toast(res.data.msg, "none")
      }
    })
  }
})