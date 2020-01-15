const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    macno: '',
    loading: false,
    form: {
      api_name: 'retrievalDoor',
      macno: '',
      type: 1,
      token: app.getToken()
    }
  },

  onLoad: function (e) {
    console.log(e)
    this.setData({
      'form.macno': e.macno
    })
  },
  onShow: function () {
    const _this = this
    app.tools.socket("connectinfo_sdxddshg_close_" + app.getUserMsg().staff_user_id, function (res) {
      console.log(app.getUserMsg().staff_user_id)
      if (res.code == 1) {
        if (JSON.parse(res.data.data).data.goods.length > 0) {
          wx.setStorageSync('order_data', res.data.data)
          wx.redirectTo({
            url: '/pages/replenish/index?id=' + _this.data.form.macno
          })
        } else {
          wx.removeStorageSync('order_data')
          wx.showToast({
            title: '此次补货未补进商品...',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }, 2000);
        }
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  openDoor: function () {
    var _this = this;
    wx.showLoading({
      title: '登录中...',
    })
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      wx.hideLoading()
      if (res.data.code == -1) {
        wx.showToast({
          title: res.data.msg,
          icon: "none",
          duration: 2000
        })
      } else {
        wx.setStorageSync('order_number', res.data.data.order_number)
        if (res.data.code == 1) {
          _this.setData({
            loading: true
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.code == 1000) {
          wx.showToast({
            title: "您尚有未完成的订单，正在前往...",
            icon: 'none',
            duration: 1500
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/replenish/index?id=' + _this.data.form.macno
            })
          }, 1500);
        }
      }

    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    wx.onSocketOpen(function () {
      console.log('有链接中的socket')
      wx.closeSocket()
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.onSocketOpen(function () {
      console.log('有链接中的socket')
      wx.closeSocket()
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})