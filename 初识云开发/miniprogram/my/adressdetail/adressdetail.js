// miniprogram/my/adressdetail/adressdetail.js
const app = getApp()
Page({

      /**
       * 页面的初始数据
       */
      data: {
        adress: [],
        png5:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC4UlEQVR4Xu2b4Y3UMBBGP3dwJUAFHB3cbANABRwdcBUAFXBUAB1wVDB3FXBUAFQAVGA0UiJF2jge2+PEjmJptX+yjt/zxOMksw6dNma+BPAMgHzL53H4PBDRLy2W0x7YynHMfAHgHYC3C2O6JaIbzZi7EjDMOgMQCbEmEfGGiOQ72LoRkAg/Aj8S0fPuBWTCj9wfiOh9SELzEVAIP3I/DS2MTQswghcJr4jobi4KmhVgCC/cwcugSQHM/ATAd+VqH8sG8N4/nE6nq94i4AuA11E63QF9RcDIxMxWEvpbA4wltJ0FhgUPoV1bYSS0vQ+YrPYy6TdEJGF/1nIkeO9/O+cuiehvkxuhQKqT/XtIwjWAz5p1z3v/zzl31ey9QCTPF0nQwovITfYByk1OloQU+E0EKOHHKE+SkAq/uoBE+CQJOfCrCsiEV0nw3t9qFrzNtsKF8BoJF0upbtMHIkbwUQma1Lh6BBjDV5FQLQ1Wgh8lfCKipafC6oCoIqAmfO5qv9pWuCd48zTYG7ypgB7hzQT0Cm8ioGf4YgG9wxcJ2AN8toC9wGcJ2BN8soC9wScJ2CO8WsBe4VUCrF9UTm9KrG9s1LeAkwOjd4PMLNUVUpRk2lqA10aAvKaWMjSz1gp8VMBQkvbHjByQd/WqNzaW51zqa/ESYOaXAL5aDaY1eE0EWL2fb27mx0mNRcBPAFKuUtRanPmogCH9iYCi1jL84iXAzPLU9WMJfevwMQFSV/ciV0AP8DEBkv40RclnjnqBDwpgZqmpk6rs5NYT/JKApO3vAH0PQC6b+5Q/LCQbNv7BbBpk5uj213v/wzknwHexOhzjMZt2dyYgtP0dKq6msxysvDIdYeXO5gRMt7/fJKSHsF7850XlcVbrfk6ALIBScDBbXl5tJBt1HH0esNG4VjvtIYCZs/L9alNkdCIiormuHDN7o3M03Q0RzUb7IeCIgOMSONaAYxFsevk2GlwoC/wH05TwUFwm4tMAAAAASUVORK5CYII="
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        if (app.globalData.openid) {
          this.setData({
            openid: app.globalData.openid
          })
        }

        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        db.collection('address').get({
          success: res => {

            //  console.log('[数据库] [查询记录] 成功: ', res);
            var that = this;
            that.setData({
              adress: res.data,
            })
            //  console.log("asdsa");
          },

          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })

      },

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: function() {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: function() {
        const db = wx.cloud.database()
        // 查询当前用户所有的 counters
        db.collection('address').get({
          success: res => {

            //  console.log('[数据库] [查询记录] 成功: ', res);
            var that = this;
            that.setData({
              adress: res.data
            })

            //  console.log("asdsa");
          },

          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: function() {
      
      },

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: function() {
        var adress = this.data.adress;
        wx.setStorage({
          key: 'adr',
          data: adress,
          success() {
           
          }
        })
      },

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function() {

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function() {

      },

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: function() {

      },
      gotoalter:function(event){
        const dataset = event.currentTarget.dataset;
    wx.setStorage({
      key: 'adress',
      data: dataset,
      success() {
        wx.navigateTo({
          url: '/my/adressalert/adressalert',
        })
        console.log(event);
      }
    })
}
      
})