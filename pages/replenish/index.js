const app = getApp()
Page({
  data: {
    deviceMsg: {
      "order_number": "",//补货编号
      "type": "",    //查看类型（1：员工 2：商家）
      "macno": "",//设备编号
      "address": "",//设备地址
      "goods": [//补货的商品数据

      ]
    },
    form: {
      api_name: 'closeGoods',
      macno: '',
      type: 1,
      order_number: '',
      page: 1,
      pagesize: 10,
      token: app.getToken()
    },
    loading: false,
    refresh: false
  },

  onReachBottom() {
    if (this.data.refresh) {
      this.getListByApi(this.data.form.page + 1)
    }
  },

  onLoad: function (e) {
    const _this = this;
    this.setData({
      'form.macno': app.getMacno()
    })
    _this.getList(1);
  },

  onShow: function () {
    const _this = this
    app.tools.socket("connectinfo_sdxddshg_close_" + app.getUserMsg().staff_user_id, function (res) {
      console.log(res.data.data)
      wx.hideLoading()
      if (res.code == 1) {
        wx.setStorageSync('order_data', res.data.data)
        _this.setData({
          'loading': false,
          'deviceMsg': JSON.parse(wx.getStorageSync('order_data')).data
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  refresh: function () {
    const _this = this
    // this.setData({
    //   'form.api_name': 'retrievalUnusual',
    //   'form.order_number': app.getOrderNum(),
    //   'refresh': true,
    // })
    // app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
    //   wx.showToast({
    //     title: res.data.msg,
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   if (res.data.code == 1) {
    _this.getListByApi(1)
    // }
    // })
  },
  confirm: function () {
    const _this = this;
    this.setData({
      'form.api_name': 'verifyRetrieval',
      'form.user_id': app.getUserType() == 1 ? app.getUserMsg().shop_id : app.getUserMsg().staff_user_id,
      'form.order_number': app.getOrderNum(),
    })
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 2000
      })
      if (res.data.code == 1) {
        wx.removeStorageSync('order_data')
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index?type=' + app.getUserType()
          })
        }, 2000);
      } else {
        // wx.showModal({
        //   showCancel: false,
        //   confirmColor: "#de6d40",
        //   title: '提示',
        //   content: '请正确放置商品',
        //   success(res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
      }
    })
  },

  getList: function () {
    const _this = this;
    if (wx.getStorageSync('order_data'))
      _this.setData({
        'refresh': false,
        'deviceMsg': JSON.parse(wx.getStorageSync('order_data')).data
      })
    else
      _this.getListByApi(1)
  },
  getListByApi(pageNo) {
    const _this = this;
    _this.setData({
      'form.api_name': 'retrievalUnusual',
      'loading': true,
      'form.page': pageNo,     //当前的页号
      'form.order_number': app.getOrderNum(),
    })

    wx.showLoading({
      title: '正在努力盘点...',
    })
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data)
        _this.setData({
          'loading': false,
        })
      } else {
        app.tools.toast(res.data.msg, "none")
      }
    })
  }
})