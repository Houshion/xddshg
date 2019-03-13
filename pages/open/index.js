const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    macno: 2019201291235465,
    loading: false,
    form: {
      api_name: 'retrievalDoor',
      macno: '99acda74080abbc5',
      type: 1,
      token: app.getToken()
    }
  },

  onLoad: function (e) {
    this.setData({
      // 'form.macno': e.macno
    })
  },
  onShow: function () {

  },
  onHide() {

  },

  openDoor: function () {
    var _this = this;
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        wx.showToast({
          title: '请放入商品并关门进行盘点',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          _this.setData({
            loading: true
          })
        }, 2000);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none",
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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