import WxValidate from 'utils/WxValidate'
const tools = require('./utils/tools.js')
App({
  onLaunch: function (opts) {
    const _this = this
    if (!wx.getStorageSync('token')) {
      // tools.wx_login(function (flag) {
      //   if (flag == 2) {
      //     wx.reLaunch({
      //       url: '/pages/index/index',
      //     })
      //   }
      // }, this)
    }
    console.log('App Launch', opts)
  },

  onShow: function (opts) {
    const _this = this
    _this.tools = tools //全局注入tools.js
  },
  onLoad: function () {
    const _this = this
    _this.tools = tools //全局注入tools.js
  },

  onHide: function () {
    const _this = this
    console.log('App Hide')
  },

  //请求接口
  wxRequest: function (url, data, successCB, failCB) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    const _this = this
    let requestUrl = _this.globalData.dlcurl + url
    let requestMethod = 'POST'
    let requestConType = 'application/x-www-form-urlencoded'
    data.token = wx.getStorageSync('token')
    wx.request({
      url: requestUrl,
      header: {
        'content-type': requestConType
      },
      data: data,
      method: requestMethod,
      success: function (res) {
        if (res.code == 401) {
          wx.clearStorage("token")
        } else {
          typeof successCB == 'function' && successCB(res)
        }
      },
      fail: function (res) {
        wx.hideLoading()
        typeof failCB == 'function' && failCB(res)
      }
    })
  },

  uploadFile: function (name, cb, data, params, count) {
    const _this = this
    let requestUrl = _this.globalData.dlcurl
    let chooseParams = {
      count: count ? count : 1,
      success: function (res1) {
        typeof cb == 'function' && cb(1, name, res1)
        if (wx.getStorageSync('allowPicNum') && wx.getStorageSync('allowPicNum') <= 0) {
          return false
        }
        let tempFilePaths = wx.getStorageSync('allowPicNum') ? res1.tempFilePaths.slice(0, wx.getStorageSync('allowPicNum')) : res1.tempFilePaths
        console.log(requestUrl)
        for (let tempFileIndex in tempFilePaths) {
          wx.uploadFile({
            url: requestUrl,
            filePath: tempFilePaths[tempFileIndex],
            name: 'upload',
            formData: {
              HTTP_API: 'api/common/upload'
            },
            success: function (res2) {
              console.log(res2)
              res2 = res2.data
              res2 = res2.trim()
              res2 = JSON.parse(res2)
              res2 = res2.data
              typeof cb == 'function' && cb(2, name, res2)
            },
            fail: function (res3) {
              typeof cb == 'function' && cb(-2, name, res3)
            }
          })
        }
      },
      fail: function (res) {
        typeof cb == 'function' && cb(-1, name, res)
      }
    }
    if (typeof params == 'object') {
      for (let i in params) chooseParams[i] = params[i]
    }
    wx.chooseImage(chooseParams)
  },

  wx_login2: function (_this) { // 点击按钮授权登录
    wx.login({
      success: function (res1) {
        wx.getSetting({
          success: function (res) {
            if (!wx.getStorageSync('userInfo')) {
              console.log(wx.getStorageSync('userInfo'))
              _this.wxRequest(
                '', {
                  HTTP_API: 'vv/usercenter/api/user/third',
                  code: res1.code,
                  platform: 'wechatapp',
                  nickname: wx.getStorageSync('userInfo').nickName,
                  avatar: wx.getStorageSync('userInfo').avatarUrl,
                  gender: wx.getStorageSync('userInfo').gender,
                  country: wx.getStorageSync('userInfo').country,
                  province: wx.getStorageSync('userInfo').province,
                  city: wx.getStorageSync('userInfo').city
                },
                function (res2) {
                  console.log("微信登录数据", res2)
                  if (res2.data.code == 1) {
                    wx.setStorageSync('token', res2.data.data.userinfo.token)
                    wx.setStorageSync('openid', res2.data.data.thirdinfo.openid)
                    wx.navigateBack()
                  } else {
                    _this.tools.error_tip(res2.data.msg)
                  }
                }
              )
            } else {
              wx.reLaunch({
                url: '/pages/login/index',
              });
            }
          }
        })
      }
    })
  },

  globalData: {
    dlcurl: 'https://sdxddshg.https.xiaozhuschool.com',
    mobile: ''
  },

  WxValidate: (rules, messages) => new WxValidate(rules, messages),

  // changeModel: function (type, title, ph) {
  //   var page = document.body;
  //   var content = '<view class="mask flex-center">' +
  //     '<view class="modelBox">' +
  //     '<view class="title">' + title + '</view>' +
  //     '<input type="' + type + '" class="input" placeholder="' + ph + '"></input>' +
  //     '<button class="bg-diy mt10">确认</button>' +
  //     '</view>' +
  //     '</view>';
  //   page.appendChild(content);
  // }

  getToken: function () {
    // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUsImV4cCI6MTU1Mjg3MjQxMn0.XQM_51SMNFoA_Zj1cdJO_y3cq2XCmo89sYINUHV0vzk"
    return wx.getStorageSync('token')
  },

  getUserMsg: function () {
    return JSON.parse(wx.getStorageSync('userMsg'))
  },

  getUserType: function () {
    return wx.getStorageSync('userType')
  },

  getMacno: function () {
    return wx.getStorageSync('macno')
  },

  getOrderNum: function () {
    return wx.getStorageSync('order_number')
  }

})