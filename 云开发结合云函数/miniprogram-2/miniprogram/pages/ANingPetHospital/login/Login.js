Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    allist1:[],
    flag: false,
    foot: true,
    allist: [],
    active: 0,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取api

    this.getinfo(this.data.active, this.data.index)
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
    this.pulllist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //下拉触发事件
   pulllist() {
      this.data.index++
      this.getinfo(this.data.active, this.data.index)
  },

  //页面加载图片api加入
  async getinfo(i, index) {
    const result = new Promise((resolve, reject) => {
      wx.request({
        url: 'http://api.tianapi.com/txapi/pet/index',
        data: {
          key: 'fd59d712f1bb9c72d510a0b9df96e85a',
          type: i,
          page: index
        },
        success(res) {
          resolve(res)
        },
        fail(res) {
          reject(res)
        }
      })
    })
    await result.then(res => {
      let list1 = this.data.list
      let allist1=this.data.allist1
      for (const item of res.data.newslist) {
        list1.push({
          tage: item.name,
          url: item.coverURL,
          day: item.life,
          time: item.price
        })
        allist1.push(item)
      }
      this.setData({
        list: list1,
        allist:allist1
      })
    }).catch(err => {
      if(err){
        console.log(1)
       this.setData({
        foot:false,
        flag:true
       })
      }
    })

  },
  //将数据写入缓存
  to: function (e) {
    let i = e.currentTarget.dataset.index
    let allist = this.data.allist[i]
    wx.setStorage({
      data: allist,
      key: 'animlist',
    })
    wx.navigateTo({
      url: './animdetail/animaldetail',
    })
  },
  //改变页面加载
  onChange(e) {

    this.data.index = 1
    //数据清空，重新计算
    this.setData({
      list: [],
      active: e.detail.index,
      allist1:[]
    })
    this.getinfo(e.detail.index, this.data.index)
  },
  //跳转到顶部
  srcrlotop(){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
})