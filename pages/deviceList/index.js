const app = getApp()
Page({
  data: {
    deviceList: [
      {
        "device_id": 28,
        "macno": "99acda74080abbc5",
        "address": "东莞市南城去",
        "inventory": "170",
        "status_name": ""
      },
    ],
    form: {
      api_name: "getDevice",
      page: 1,
      pagesize: 10,
      token: app.getToken()
    }
  },

  onLoad: function (e) {
    const _this = this
    _this.getList()
  },

  onShow: function () {
    const _this = this

  },

  getList() {
    const _this = this;
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data)
      }
    })
  }
})