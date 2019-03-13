const app = getApp()
Page({
  data: {
    deviceMsg: {
      "device_id": 2,//设备ID
      "macno": "456",//设备编号
      "address": "高盛科技园大厦",//设备地址
      "status_name": "缺货",//设置状态
      "goods": [//设备商品数据
        {
          "device_goods_id": 3,//设备商品表ID
          "inventory": 0,//商品库存
          "title": "特轮苏3",//商品名称
          "img": "http://qzqianpa.app.xiaozhuschool.com/public/uploads/1.png"//商品图片
        },
        {
          "device_goods_id": 1,
          "inventory": 2,
          "title": "特轮苏",
          "img": "http://qzqianpa.app.xiaozhuschool.com/public/uploads/1.png"
        },
        {
          "device_goods_id": 2,
          "inventory": 2,
          "title": "特轮苏2",
          "img": "http://qzqianpa.app.xiaozhuschool.com/public/uploads/1.png"
        }
      ]
    },
    form: {
      api_name: "deviceGoods",
      macno: 0,
      page: 1,
      pagesize: 10,
      token: app.getToken()
    },
    userType: app.getUserType(),
  },

  onLoad: function (e) {
    const _this = this
    _this.setData({
      "form.macno": "99acda74080abbc5"
      // "form.macno": e.id
    })
    _this.getList();
  },

  onShow: function () {
    const _this = this
  },

  getList: function () {
    const _this = this;
    app.wxRequest('/wxsite/Device/api', _this.data.form, function (res) {
      if (res.data.code == 1) {
        console.log(res.data.data)
      }
    })
  },

  clear: function () {
    console.log("clear")
  }
})