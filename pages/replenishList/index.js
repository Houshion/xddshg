const app = getApp()
Page({
  data: {
    replenishList: [

    ],
    form: {
      api_name: "staffReplenish",
      page: 1,
      pageseze: 10,
      token: app.getToken()
    },
    url: '',
    loading: false
  },
  onReachBottom() {
    this.getList(this.data.form.page + 1)
  },

  onLoad: function (e) {
    const _this = this
    let type = app.getUserType();
    console.log(type)
    switch (type) {
      case 1:
        _this.setData({
          'form.api_name': "shopReplenish",
          'url': "/wxsite/shop/api",
        })
        break;
      case 2:
        _this.setData({
          'form.api_name': "staffReplenish",
          'url': "/wxsite/Device/api"
        })
        break;
    }
    _this.getList(1);
  },

  onShow: function () {
    const _this = this

  },
  getList: function (pageNo) {
    const _this = this;
    let list = [];
    if (pageNo == 1) {
      list == []
    } else {
      list = list.concat(_this.data.replenishList)
    }
    _this.setData({
      'form.page': pageNo,     //当前的页号
      'loading': true
    })
    app.wxRequest(_this.data.url, _this.data.form, function (res) {
      wx.hideLoading()
      if (res.data.code == 1) {
        let arr = list.concat(res.data.data)
        // console.log(arr)
        _this.setData({
          'replenishList': arr,
          'loading': false
        })
        console.log(JSON.stringify(_this.data.replenishList))
      } else {
        app.tools.toast(res.data.msg, "none")
      }
    })
  },
})