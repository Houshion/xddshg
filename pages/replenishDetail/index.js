const app = getApp()
Page({
  data: {
    orderMessage: {
      orderNo: 215615639,
      address: "广东省东莞市南城区高盛科技园303",
      time: "2019-01-01 10:00",
      replenisher: "欧少"
    },
    goodsList: [{
      title: "红牛",
      replenishNum: 10,
      status: "+",
      img: "/image/loading.png"
    },
    {
      title: "红牛",
      replenishNum: 10,
      status: "+",
      img: "/image/loading.png"
    },
    {
      title: "红牛",
      replenishNum: 10,
      status: "+",
      img: "/image/loading.png"
    }
    ]
  },

  onLoad: function (e) {
    const _this = this
  },

  onShow: function () {
    const _this = this

  },
  refresh: function () {
    wx.showModal({
      showCancel: false,
      confirmColor: "#de6d40",
      title: '提示',
      content: '请正确放置商品',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  confirm: function () {
    wx.showToast({
      title: '补货成功',
      icon: 'success',
      duration: 2000
    })
  }
})