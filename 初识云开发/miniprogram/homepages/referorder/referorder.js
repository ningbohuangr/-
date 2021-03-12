// homepages/referorder/referorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo_url:"",
    storename:"",
    express_fee:0,
    total:0,
    curIndex:0,
    savefoods:[],
    adress:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let savefoods = this.data.savefoods;
    let adress = this.data.adress;
    var total = parseFloat(options.total);
    var that=this;
    wx.getStorage({
      key: 'store-information',
      success: function (res) {
        that.setData({
          express_fee: res.data.express_fee,
          store_name:res.data.store_name,
          logo_url: res.data.logo_url
        })
       total=total+res.data.express_fee;
       total=parseFloat(total.toFixed(10));
      },
    })
  
    wx.getStorage({
      key: 'savefoods',
      success: function (res) {
      that.setData({
        savefoods:res.data,
        total: total 
      })
      }
    });
    wx.getStorage({
      key: 'adr',
      success: function(res) {
        that.setData({
          adress:res.data
        })
        console.log(adress);
      },
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
  intostorebring:function(e){
    this.setData({
      curIndex:0
    })
  },
  intostoreself:function(e){
     this.setData({
      curIndex: 1
    })
  },
  intoorder:function(e){
    const db=wx.cloud.database();
    let logo_url = this.data.logo_url;
    let store_name=this.data.store_name;
    let user=this.data.adress[0].name;
    let address=this.data.adress[0].detail;
    let phone=this.data.adress[0].phone;
    let detail=this.data.savefoods;
    let total=this.data.total;
    db.collection('Order').add(
      {
        data:{
          user:user,
          store_name:store_name,
          logo_url: logo_url ,
          total:total,
          address:address,
          phone:phone,
          detail:detail,
          status:0,
          titel:""
        },
        success:function(res){
          wx.showModal({
            title: '重要提醒',
            content: '本程序暂不支持付款',
            success:function(){
              wx.switchTab({
                url: '/homepages/homepages',
              })
              console.log('欧克');
            }
          })
        }
      }
    )
  }
})