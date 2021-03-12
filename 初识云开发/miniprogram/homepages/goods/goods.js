// miniprogram/homepages/goods/goods.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min_amount:0,
    recount: 0,
    total: 0,
    toView: "",
    curIndex: 0,
    foods: [],
    savefoods: [],
    category: [],
    categorydetail: "hao"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const store_name = options.store_name;
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    var that = this;
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('foods').where({
      storename: store_name,

    }).orderBy('categoryid', 'asc').orderBy('price', 'asc').get({
      success: res => {

        //  console.log('[数据库] [查询记录] 成功: ', res);
       
        that.setData({
          foods: res.data,
        })

      },

      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    db.collection('category').where({
      storename: store_name,
    }).get({
      success: res => {

        //  console.log('[数据库] [查询记录] 成功: ', res);
        that.setData({
          category: res.data
        })

      },

      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    wx.getStorage({
      key: 'store-information',
      success: function(res) {
        that.setData({
          min_amount:res.data.min_amount
        })
      },
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
    var savefoods = [];
    this.setData({
      savefoods: savefoods
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
  switchTab: function(e) {
    const self = this;
    setTimeout(function() {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)

  },
  intoadd: function(e) {
    var price = e.currentTarget.dataset.price;
    var total = this.data.total;
    total = total + price;
    total = parseFloat(total.toFixed(10));
    this.setData({
      total: total
    })
    var that = this;
    var index = e.target.dataset.index;
    var con = that.data.foods[index].count + 1;
    var key = 'foods[' + index + '].count';
    var obj = {};
    obj[key] = con;
    this.setData(obj);
  },
  intocut: function(e) {
    var index = e.target.dataset.index;
    var con = this.data.foods[index].count;
    var price = e.currentTarget.dataset.price;
    var total = this.data.total;
    if (con >= 1) {
      if (total > 0) {
        total = total - price;
        total = parseFloat(total.toFixed(10));
      }
    }
    this.setData({
      total: total
    })
    that = this;
    key = 'foods[' + index + '].count';
    obj = {};
    if (con <= 0) {
      obj[key] = 0;
      that.setData(obj);
    } else {
      con--;
      obj[key] = con;
      that.setData(obj);
    }
  },
  intoorder: function(e) {
    let savefoods = this.data.savefoods;
    let foods = this.data.foods;
    const total = this.data.total;
    const min_amount = this.data.min_amount;
    let ex;
    if (total <=0) {
      wx.showModal({
        title: '亲，请注意',
        content: '请先点餐',
      })
    } else if (total > 0 && total <min_amount){
      wx.showModal({
        title: '亲，请注意',
        content: "不满足最低起送￥"+min_amount,
      })
    }
    else{
      for (let i = 0; i < foods.length; i++) {
        if (foods[i].count > 0) {
          ex = foods[i];
          savefoods.push(ex);
        }
      }
      wx.setStorage({
        key: 'savefoods',
        data: savefoods,
        success() {
          wx.navigateTo({
            url: '/homepages/referorder/referorder?total=' + total,
          })
        }
      })
    }
  }
})