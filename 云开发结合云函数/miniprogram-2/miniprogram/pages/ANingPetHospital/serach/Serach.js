// miniprogram/pages/ANingPetHospital/serach/Serach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arealist: {},
    show:true,
    isinfo:true,
    hopitallist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getdata',
      // 传给云函数的参数
      data: {
        name:'hospitallist'
      },
      success: function(res) {
       that.setData({
        hopitallist:res.result.data
       })
      },
      fail: console.error
    })




    const db = wx.cloud.database();
    db.collection("all")
  .get()
  .then((res) => {
    if (res.data && res.data.length > 0) {
      this.setData({
        arealist: res.data[0],
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
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
  onChange() {
   this.setData({
     show:true
   })
  },
  go() {

  },
  getadress(e){
    this.setData({
      show:false
    })
    const flag= this.data.hopitallist.filter((res)=>res.province==e.detail.values[0].name||res.city==e.detail.values[0].name||res.county==e.detail.values[0].name)
    if(flag.length>0){
      console.log(flag)
     this.data.hopitallist=[]
     const list=this.data.hopitallist.concat(flag)
     this.setData({
       hopitallist:list
     })
     
    }else{
        this.setData({
          isinfo:false
        })
        console.log(1)
    }
    
  },
  godetail(){
    wx.navigateTo({
      url: './hospitaldetail/hospitaldetail',
    })
  }
})