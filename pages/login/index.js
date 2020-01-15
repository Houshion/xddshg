const app = getApp()
Page({
  data: {
    form: {
      api_name: '',
      mobile: '',//'17875913101',
      pass: '',//'123456'
    },
    loginType: [
      { name: '商家登录', value: '1', checked: true },
      { name: '补货登录', value: '2', checked: false },
    ],
    type: 1,
    login: "登录",
  },

  onLoad: function (e) {
    const _this = this
  },

  onShow: function () {
    const _this = this

  },

  userTypeChange(e) {
    const _this = this;
    let type = e.target.dataset.type;
    switch (type) {
      case 1:
        _this.setData({
          'loginType[0].checked': true,
          'loginType[1].checked': false,
          'type': 1
        })
        break;
      case 2:
        _this.setData({
          'loginType[0].checked': false,
          'loginType[1].checked': true,
          'type': 2
        })
        break;
    }
  },

  getName(e) {
    let username = "form.mobile"
    this.setData({
      [username]: e.detail.value
    })
  },
  getPass(e) {
    let password = "form.pass"
    this.setData({
      [password]: e.detail.value
    })
  },

  wx_loginByButton: function (e) {
    let _this = this
    switch (_this.data.type) {
      case 1:
        _this.setData({
          'form.api_name': "merchant_login"
        })
        break;
      case 2:
        _this.setData({
          'form.api_name': "staff_login"
        })
        break;
    }
    wx.showLoading({
      title: '登录中...',
    })
    app.wxRequest('/wxsite/Public/api', _this.data.form, function (res) {
      wx.hideLoading()
      if (res.data.code == 1) {
        wx.setStorageSync('userType', _this.data.type)
        wx.setStorageSync('token', res.data.data.token)
        wx.setStorageSync('userMsg', JSON.stringify(res.data.data))
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index?type=' + app.getUserType()
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
  }
})