// miniprogram/homepages/homepages.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min_amount:0,
    express_fee:0,
    store_name:"",
    logo_url:"",
    store:{
      
    },
    bigmenu:[
      {
        bigmenu_id:1,
        icon:"cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/image/美食.png",
        title:"美食",
      },
      {
        bigmenu_id: 2,
        icon: "cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/image/超市便利店.png",
        title: "超市便利",
      },
      {
        bigmenu_id:3,
        icon: "cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/image/甜点饮品.png",
        title: "甜点饮点",
      },
      {
        bigmenu_id:4,
        icon: "cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/image/蔬菜水果.png",
        title: "蔬菜水果",
      },
      {
        bigmenu_id:5,
        icon: "cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/image/鲜花.png",
        title: "烂漫鲜花",
      },
      {
        bigmenu_id: 6,
        icon: "cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/image/食堂.png",
        title: "校园食堂",
      },
      {
        bigmenu_id: 7,
        icon: "cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/image/晚餐.png",
        title: "品质晚餐",
      },
      {
        bigmenu_id: 8,
        icon: "cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/image/全部分类.png",
        title: "全部分类",
      },
    ],
    imgUrls: [
      'cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/1.jpg',
      'cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/2.jpg',
      'cloud://bohuang-r9cm1.626f-bohuang-r9cm1-1301343916/3.jpg'
    ],
    png1: "data:image/png;base64,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",
    png2: "data:image/png;base64,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",
    
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
    db.collection('store').get({
      success: res => {

        //  console.log('[数据库] [查询记录] 成功: ', res);
        var that = this;
        that.setData({
          store: res.data,
        })
          console.log(this.data.store);
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let express_fee = this.data.express_fee;
    let store_name=this.data.store_name;
    let min_amount = this.data.min_amount;
    let logo_url = this.data.logo_url;
    wx.setStorage({
      key: 'store-information',
      data: {
        express_fee:express_fee,
        store_name:store_name,
        min_amount: min_amount,
        logo_url: logo_url
      }
    })
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
  intogoods:function(e){
    const store_name = e.currentTarget.dataset.store_name;
    this.data.express_fee = e.currentTarget.dataset.express_fee;
    this.data.min_amount = e.currentTarget.dataset.min_amount;
    this.data.logo_url = e.currentTarget.dataset.logo_url;
    this.data.store_name=store_name;
    console.log(store_name);
    wx.navigateTo({
      url: '/homepages/goods/goods?store_name='+store_name,
    })
  }
})