// miniprogram/my/adressalert/adressalert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adress: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.getStorage({
      key: 'adress',
      success: function(res) {
        self.setData({
          adress: res.data
        })
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
  alertevent: function(event) {
    const db=wx.cloud.database();
    const _ = db.command;
    const _id = this.data.adress._id;
    const name =event.detail.value.name;
    const phone = event.detail.value.phone;
    const detail = event.detail.value.detail;
    db.collection('address').doc(_id).update({
      data:{
      name:name,
      phone:phone,
      detail:detail
      },
      success:function(res){
        // this.setData({
        //   adress:""
        // })
       wx.navigateBack();
      }
    })
  },
  delecteadress: function(event) {
    console.log(event);
    wx.showModal({
      title: "警告",
      content: "是否删除该地址",
      success: function(res) {
        if (res.confirm) {
          const db = wx.cloud.database();
          const _id = event.currentTarget.dataset._id;
          db.collection('address').doc(_id).remove({
            success: function (res) {
            console.log("删除成功");
           wx.navigateBack();
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '删除失败',
              })
              console.error('[数据库] [删除记录] 失败：')
            }
          })
        }
      }
    })
   }
})