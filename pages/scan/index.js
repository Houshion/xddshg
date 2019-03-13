const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onOff: false,
    isScanner: 1
  },

  onShow: function () {
    // wx.showLoading({
    //   title: '加载中',
    // })
    if (this.data.isScanner == 1) {
      // this.scan()
    }

  },
  onHide() {
    this.setData({
      isScanner: 0
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  scan: function () {
    const _this = this;
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果', res)
        // let macno = res.result
        let macno = app.tools.getUrl("macno", res.result)
        console.log(macno)

      }
    })
  },

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