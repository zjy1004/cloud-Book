// pages/study/study.js
import { fetch, login } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookData: [],
    isLoading: true,
    pn: 1,
    hasmore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRead()
  },
  getPercent(e) {
    let Arr = e.data
    Arr.forEach(item => {
      item.percent = item.title.index / item.title.total * 100
      item.percent = item.percent.toFixed(0)
    })
    
  },
  //获取已经读的数据
  getRead() {
    return new Promise((resolve, reject) => {
      fetch.get('/readList').then(res => {
        this.getPercent(res)
        console.log(res)
        this.setData({
          bookData: res.data,
          isLoading: false
        })
      })
    })  
  },
  //获取单个图书
  getDetails(e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
//获取文章内容
  handleGet(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let bookId = e.currentTarget.id
    wx.navigateTo({
      url: `/pages/book/book?id=${bookId}&&bookId=${id}`,
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
    this.getRead.then(() => {
      wx.stopPullDownRefresh()
      this.setData({
        pn: 1,
        hasmore: true,
        isLoading: true
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasmore) {
      this.setData({
        pn: this.data.pn + 1
      })
      this.getRead().then(res => {
        if (res.data.length < 2) {
          this.setData({
            hasmore: false
          })
        }
      })
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})