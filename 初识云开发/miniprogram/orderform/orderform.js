// miniprogram/orderform/orderform.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex:0,
    order:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
     const db=wx.cloud.database();
     db.collection("Order").get({
       success:function(res){
         console.log(res.data);
         that.setData({
           order:res.data
         })
       }
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    const db = wx.cloud.database();
    db.collection("Order").get({
      success: function (res) {
        console.log(res.data);
        that.setData({
          order: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  intoallorder:function(){
    this.setData({
      curIndex:0
    })
  },
  intoestimate:function(){
    this.setData({
      curIndex: 1
    })
  },
  intoreimburse:function(){
    this.setData({
      curIndex:2
    })
  }
})