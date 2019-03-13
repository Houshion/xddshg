const app = getApp()
Page({
  data: {
    deviceMsg: {
      "order_number": "B201805193414",//补货编号
      "type": "1",    //查看类型（1：员工 2：商家）
      "macno": "456",//设备编号
      "address": "高盛科技园大厦",//设备地址
      "goods": [//补货的商品数据
        {
          "num": 2,//补货数量
          "title": "特轮苏",//商品名称
          "img": "http://qzqianpa.app.xiaozhuschool.com/public/uploads/1.png"//商品图片
        },
        {
          "num": 1,
          "title": "特轮苏2",
          "img": "http://qzqianpa.app.xiaozhuschool.com/public/uploads/1.png"
        }
      ]
    },
    form: {
      api_name: 'closeGoods',
      macno: '99acda74080abbc5',
      type: 1,
      order_number: '',
      page: 1,
      pagesize: 10,
      token: app.getToken()
    },
    totalPage: 10,
    loading: false
  },

  onReachBottom() {
    if (this.data.form.page < this.data.totalPage) {
      this.getList(this.data.form.page + 1)
    }
  },

  onLoad: function (e) {
    const _this = this;
    _this.getList(1);
  },

  onShow: function () {
    const _this = this

  },
  refresh: function () {
    const _this = this
    this.setData({
      'form.api_name': 'retrievalUnusual'
    })
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  confirm: function () {
    const _this = this;
    this.setData({
      'form.api_name': 'verifyRetrieval',
      'form.user_id': '',
    })
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data)
        wx.showToast({
          title: '补货成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
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

  getList: function (pageNo) {
    const _this = this;
    _this.loading = true
    console.log(pageNo)
    _this.setData({
      'form.page': pageNo,     //当前的页号
    })
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data)
        _this.loading = false
      }
    })
  },
})