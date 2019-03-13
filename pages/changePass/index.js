const app = getApp()
Page({
    data: {
        form: {
            api_name: "savePass",
            user_id: app.getUserMsg().shop_id,
            usedpass: '',
            newpass: '',
            repeatpass: ''
        }
    },

    onLoad: function (e) {
        const _this = this
    },
    onShow: function () {
        const _this = this

    },
    confirm: function () {
        let _this = this
        if (_this.data.form.newpass !== _this.data.form.repeatpass) {
            wx.showToast({
                title: '两次输入密码不一致',
                icon: "none",
                duration: 2000
            })
            return false;
        }
        app.wxRequest('/wxsite/Public/api', _this.data.form, function (res) {
            if (res.data.code == 1) {
                wx.showToast({
                    title: res.data.msg,
                    duration: 2000
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
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
    },
    getOldPass: function (e) {
        this.setData({
            "form.usedpass": e.detail.value
        })
    },
    getNewPass: function (e) {
        this.setData({
            "form.newpass": e.detail.value
        })
    },
    getNewPassAgain: function (e) {
        this.setData({
            "form.repeatpass": e.detail.value
        })
    },
})