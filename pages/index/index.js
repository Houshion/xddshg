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
        to: '/pages/replenishList/index',
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
    let type = app.getUserType();
    console.log(type)
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
        'list[2].status': false
      })
    }
  },

  onShow: function () {
    const _this = this
    let shop = {
      url: '/wxsite/Shop/api',
      form: {
        api_name: 'homeDetail',
        token: app.getToken(),
        shop_id: app.getUserMsg().shop_id,
      }
    };
    let replenish = {
      url: '/wxsite/Device/api',
      form: {
        api_name: 'ReplenishHome',
        token: app.getToken(),
        shop_id: app.getUserMsg().staff_user_id,
      }
    }
    app.wxRequest(
      app.getUserType() == 1 ? shop.url : replenish.url,
      app.getUserType() == 1 ? shop.form : replenish.form,
      function (res) {
        if (res.data.code == 1) {
          _this.setData({
            'mainData': res.data.data
          })
        } else {
          app.tools.toast(res.data.msg, "none")
        }
        wx.hideLoading()
      })
  },
  logout: function () {
    wx.clearStorage();
    wx.reLaunch({
      url: '/pages/login/index'
    })
  }
})