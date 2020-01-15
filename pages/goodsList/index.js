const app = getApp()
Page({
  data: {
    deviceMsg: {
      // "device_id": 2,//设备ID
      // "macno": "456",//设备编号
      // "address": "高盛科技园大厦",//设备地址
      // "status_name": "缺货",//设置状态
      // "goods": [//设备商品数据
      //   {
      //     "device_goods_id": 3,//设备商品表ID
      //     "inventory": 0,//商品库存
      //     "title": "特轮苏3",//商品名称
      //     "img": "http://qzqianpa.app.xiaozhuschool.com/public/uploads/1.png"//商品图片
      //   },
      //   {
      //     "device_goods_id": 1,
      //     "inventory": 2,
      //     "title": "特轮苏",
      //     "img": "http://qzqianpa.app.xiaozhuschool.com/public/uploads/1.png"
      //   },
      //   {
      //     "device_goods_id": 2,
      //     "inventory": 2,
      //     "title": "特轮苏2",
      //     "img": "http://qzqianpa.app.xiaozhuschool.com/public/uploads/1.png"
      //   }
      // ]
    },
    form: {
      api_name: "deviceGoods",
      macno: 0,
      page: 1,
      pagesize: 10,
      token: app.getToken()
    },
    userType: '',
  },

  onLoad: function (e) {
    const _this = this
    console.log(e)
    _this.setData({
      // "form.macno": "99acda74080abbc5"
      "form.macno": e.id,
      "userType": app.getUserType()
    })
    _this.getGoods();
  },

  onShow: function () {
    const _this = this
    app.tools.socket("connectinfo_sdxddshg_close_" + app.getUserMsg().staff_user_id, function (res) {
      wx.hideLoading()
      app.tools.toast("清除成功", "success")
      _this.setData({
        "deviceMsg.goods": []
      })
    })
  },

  getGoods: function () {
    const _this = this;
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      wx.hideLoading()
      if (res.data.code == 1) {
        _this.setData({
          "deviceMsg": res.data.data
        })
      } else if (res.data.code == 1000) {
        wx.showToast({
          title: "您尚有未完成的订单，正在前往...",
          icon: 'none',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/replenish/index?id=' + _this.data.form.macno
          })
        }, 1000);
      } else {
        app.tools.toast(res.data.msg, "none")
      }
    })
  },

  clear: function () {
    const _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要清空所有商品',
      success(res) {
        if (res.confirm) {

          app.wxRequest('/wxsite/Device/api', {
            api_name: 'removeGoods',
            macno: _this.data.form.macno,
            type: '1',
            token: app.getToken(),
          }, function (res) {
            wx.hideLoading()
            if (res.data.code == 1) {
              wx.showLoading({
                title: '正在清除...',
              })
            } else {
              app.tools.toast(res.data.msg, "none")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})