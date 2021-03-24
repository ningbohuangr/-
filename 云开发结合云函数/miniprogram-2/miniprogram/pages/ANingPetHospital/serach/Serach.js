// miniprogram/pages/ANingPetHospital/serach/Serach.js
var bmap = require('../../../libs/bmap-wx.min');
var wxMarkerData = []; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arealist: {},
    markers:[],
    show: true,
    isinfo: true,
    hopitallist: [],
    longitude: 0,
    latitude: 0,
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getdata',
      // 传给云函数的参数
      data: {
        name: 'hospitallist'
      },
      success: function (res) {
        that.setData({
          hopitallist: res.result.data
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
      show: true
    })
  },
  go() {

  },
  getadress(e) {
    this.setData({
      show: false
    })
    const flag = this.data.hopitallist.filter((res) => res.province == e.detail.values[0].name || res.city == e.detail.values[0].name || res.county == e.detail.values[0].name)
    if (flag.length > 0) {
      console.log(flag)
      this.data.hopitallist = []
      const list = this.data.hopitallist.concat(flag)
      this.setData({
        hopitallist: list
      })

    } else {
      this.setData({
        isinfo: false
      })
      console.log(1)
    }

  },
  //去医院详细页面
  godetail() {
    wx.navigateTo({
      url: './hospitaldetail/hospitaldetail',
    })
  },
  //分装地图获取方法
  mapget(e) {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'g8CeDOHDXcEqymVg7LYwQ2xwVYDatE4T'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData; 
      // console.log(data.originalData.results[0].location.lng)
      // console.log(data.originalData.results[0].location.lat)
      that.setData({
        longitude:wxMarkerData[0].longitude ,
        latitude:wxMarkerData[0].latitude,
        markers:wxMarkerData
      })
      console.log(data)
    }

    // var sugData = ''; 
    // for(var i = 0; i < data.result.length; i++) { 
    //     sugData = sugData + data.result[i].name + '\n'; 
    // } 
    // that.setData({ 
    //     sugData: sugData 
    // }); 
    BMap.search({ 
      "query": e, 
      fail: fail, 
      success: success, 
      // 此处需要在相应路径放置图片文件 
      iconPath: '../../../images/地址 (1).png', 
      // 此处需要在相应路径放置图片文件 
      iconTapPath: '../../../images/地址 (2).png'
  }); 
  },
  bdinpunt(e){
    this.setData(
      {
        value:e.detail.value
      }
    )
  },
  mapgetadress(){
    this.mapget(this.data.value)
  }
})