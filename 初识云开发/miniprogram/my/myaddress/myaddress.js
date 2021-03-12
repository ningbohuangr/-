// miniprogram/my/myaddress/myaddress.js
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    adress: [],
    png1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC90lEQVR4Xu1a/3FTMQyWJoBOQDdoO0GRF6BMQDYgGxA2CBuUCSgLWO0EpBu0EzRMIE45J5fLS+5Zfn7Eucj/Plu2vvfJsn4gnPnAM9cfHABnwJkj4CZw5gTwS3CQCTDzexG5QsSPx2CSiDwi4jMRLUv3LwJAFQeAbwAwLd248ro5AHwvAcIMADNfA8AvALisrMRQcS8A8JmIFhZBJQD8AQAFAUTkLwAsEPHRsmmtuSKipneNiO+SzAUR3VjkmwBg5lmivir/jIh3RKTIH20w86WIPCDiVTqEmoKeM2tYAdj8fQAgIjrKn9/VjJmVCVzCAisAst6ciExrs37HgEnMXHS2bCXS5acMWNE/hLC6B1oZMUa9i9ZmcJN7GVoA2NBMRJ5CCEfx/YcAjzHqm+A2fc82Twcgl8LbF40zwE3A7wC/BN0LuBvsvgNSmPxpxEhR447f+8LeJt4BzHwPAF9yXWvhvJ9ENNld2woADwCgDBhzKAPuWgVAkySdv1MZjft9IXgTDKisqEmcA+DBUCPRoAZNIrJJTph4nDE5hPC0b1oTJsDMmp7+mqHHkCk/iKiTjm8CgBjjCyJ+GKJd31oReQ0hdFLyTQCgaTMRURaMNhBxui/d1QQAo2mdIdgBcDfYiBvMYOsoU5owgUpuUEvdWuQ0VZ1aAaDWA8hU31NKtQLARN3gVrXWTPdUdJ3kVnbWGzQBgFnbigscAHeD7ga9OOrVYS+Pe3+AN0ikp8UoHSLaHfqWNlgS0UXFd8xgUcysZ9Mz6rjI7RrNbpFJ7+3l1jM3e5PB2vUISDXJ1c/R5s0QwhqI3q1NADDzdunLHLD0nqZwwnYDZyqedkpnh0RbAdDWuFWrXBpz7dI8lKou1Cd7WYzxVrtVd5q2s1vkdCMTALpgB+3sw/6niWZWmgFIIExFZDYk7K0JiNo9Is6IyJyRLgIggaC5eQVCu7XX/remXr2ytF0PEbU9fl7atF0MQO/pTmSCA3AiP2q0YzoDRoP2RASfPQP+AaBBs1+6bLoJAAAAAElFTkSuQmCC",
    png2: "data:image/png;base64,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",
    png3: "data:image/png;base64,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",
    png4: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE3ElEQVR4Xu2bgbEMQRCG+0WACBABIkAEiAARIAJEgAh4ESACRIAIEAEioL6q/a96e2d3Z3dm9+1t3VS9qnd3szPT/3T3/N09e2b57aaZ3TOzO2bG/5fzH1285zcz+2lmH8zso5n9yZ3xLKPjNTN72wie0f3CuyD8azN7kwPEGACPGuEvXKoZC0ArHjSa0fv4EADHLLwERhvumhlgJFsfAPfN7P0M1Lf4CMIDQtIvpADAuf3YmJMrBfbczNDoTksBgAN5UjrjBp+/lTKFFAD/Nrj4GktKakEEYE+2H0GDJ1yPX0YAXpjZ8xpwb3QMAACIQ4sAvDOzhxtdfI1lcRp8HgKAH2/XmGmjY5wAqKEBBBsEHS1bqrTjcBCCLc7sS2HML83iITQEY3NMtVgDWAQLXLpFGv7LzAjKfJvjr4oBeGlmnBRLNzTht5skNS8b8WniQo4GAHYbOq62GQA4JUBx6fbUzF65SVIk5kJMgDUBQussrYwGu58KXDSvnGAyuBlZS7EJVJZ19eFOANTgAatvW8UJTxpQQwP+NoP05tkyd4xzvC/ugPjANulzI3O8nG7FGoDw0NBaNDiVf4Bq871azQxVMQDPmpx7Dtq5fdhpCi5qVxIJzFpZqmIAyLOz4Jot7nAqTfe10bzSeYsBQHhAqNXg/AjnA50IcqTFJXMXA8DkUFDKTqVOEAfI7uNTfIPpQYWJPHGABF+xTx8I3xvzYW08w58Pq6sAULIDSzyLYwZINiblnNEyfid/sDsA2HFOjCg4Ox81VGY2mBQ9ppwgxyUBESbDLlPM4bP3J6OV4uhxjwUAdh6SpMiQOmbMGHlzY9dxrh2/VQIATmpuY8fGGB5s8GrPBMrvo+pkhXRZgzVh79IKNEIcAxAoj7WKpFMBYFHYXOkJILlSTNDbNYKhlR4snx1iHfqtL13nkyucXnw+tKkArMEEo6eO+UExRS/Y4+YUQDBMAY+vLLKObmWRW0xzKgCdY2SuDbjnYjkuxQS10z5OQKUxEZ+pRuVJpckkRKo8mfJg2VQAWg9XEJ4hYiyQKmOTIUYoqTm2D4OkqX+KMfpcogBrBVtTAWAQtKBWNJhKbce7PRRrlYr3iwcEHJrWgjNM1Swko064Vm1jKgDadCYtBWHsqp3obFS0VEDmQfL9fUElZUaTTaCS1hcPg9koM81J0letktP25tFy5HM1oFiCFQbwN0K8o23dEdgrAN5Zez9TzANW2LjiKbyK+yIrUSOmUMQEi1e38ACRE3DFlwa7BIyqscDCsswaXvbt1d4HTp1B9+QDPEfQkefVHiLF327yAXE35fg8S9R3CA5Rwj/s9pKU4hR/5EnDlXneXUrMa4GiPN0b8A5RscSuARji/CqsnADYsw8YMoFsDahZiJx1kBc8pCgRjw/pwdtzHPqM0qgJHPNlaYQlORIbbFD3iTrZpr1dlwcEtBiyI01QqT112bKTDwC9WqXoAm2e/Si0FwDIF6hmQPKUhGgya7ynV2aS0V4DJdwA8+5ksfpemqJjvKw8e1tWetA7QeweE4D6DtYw9vTanGTxN0gxA47H3ranFyclS86VmwMgQwDQ6ZjeHlUuAK+PI6Ro0kmBRVUYA4D+pJFQq62/StPHAwZdUA4AGoA4WyloQOmr3K7k81rTcPyJA0wq3P4HSh9TULZ/vlwAAAAASUVORK5CYII="
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // if (app.globalData.openid) {
    //   this.setData({
    //     openid: app.globalData.openid
    //   })
    // }

    // const db = wx.cloud.database()
    // // 查询当前用户所有的 counters
    // db.collection('address').get({
    //   success: res => {

    //     console.log('[数据库] [查询记录] 成功: ', res.data[1]);
    //     var adress=this.data.adress;
    //     for(var i=0;i<=res.data.length-1;i++){
    //     adress.push(res.data[i])}
    //     console.log(adress[1]._id);
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
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
})