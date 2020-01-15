Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "名字"
  },

  onReady() {
   
  },

  onShow: function () {
    console.log(this.data.name)
  },

  click(){
    this.setData({
      name: this.test().name
    })
  },

  test(){
   return {
     name: "这个怎么显示"
   }
  },

  test(){
    return "这个怎么显示"
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    
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