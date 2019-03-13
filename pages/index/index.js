const app = getApp()
Page({
  data: {
    list: [
      {
        title: '扫码上货',
        icon: 'iconscan',
        to: '/pages/scan/index',
        status: true
      },
      {
        title: '我的设备',
        icon: 'iconshebei',
        to: '/pages/deviceList/index',
        status: true
      },
      {
        title: '订单记录',
        icon: 'iconorder',
        to: '/pages/orderList/index',
        status: true
      },
      {
        title: '补货记录',
        icon: 'icontag',
        to: '/pages/replenish/index',
        status: true
      },
      {
        title: '修改密码',
        icon: 'iconxiugai',
        to: '/pages/changePass/index',
        status: true
      },
    ],
    mainData: {},
    type: 1,
  },

  onLoad: function (e) {
    const _this = this;
    console.log(e)
    let type = e.type;
    _this.setData({
      mainData: app.getUserMsg(),
      type: type,
    })
    if (type == 1) {
      _this.setData({
        'list[0].status': false
      })
    } else {
      _this.setData({
        'list[1].status': false
      })
    }
  },

  onShow: function () {
    const _this = this

  },
  logout: function () {
    wx.clearStorage();
    wx.reLaunch({
      url: '/pages/login/index'
    })
  }
})