// pages/study/study.js
import { fetch, login } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookData: [],
    isLoading: false,
    // pn: 1,
    // hasmore: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRead()
  },
  //获取百分比
  getPercent(e) {
    let Arr = e.data
    Arr.forEach(item => {
      item.percent = item.title.index / item.title.total * 100
      item.percent = item.percent.toFixed(0)
    })
  },
  //获取时间差
  getDifftime(arr) {  
    arr.forEach(item => {
      // console.log(item)
      let dateBegin = item.updatedTime
      let dateEnd = new Date() // 获取当前时间
      let btime = Date.parse(new Date(dateBegin)); //dateBegin 为开始时间
      let etime = Date.parse(new Date(dateEnd)); // dateEnd 为结束时间
      let usedTime = etime - btime; //两个时间戳相差的毫秒数
      // 计算相差天数
      let days = Math.floor(usedTime / (24 * 3600 * 1000));
      //计算出相差小时数
      let leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000));
      // //计算相差分钟数
      // let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      // let minutes = Math.floor(leave2 / (60 * 1000));
      let difftime = days + "天" + hours + "小时"
      item.difftime = difftime
    })
  },
  
  //获取已经读的数据
  getRead() {
    this.setData({
      isLoading:true
    })
   return new Promise((resolve, reject) => {
     fetch.get('/readList').then(res => {
       resolve()
       this.getPercent(res)
       this.getDifftime(res.data)
       console.log(res)
       this.setData({
         bookData: res.data,
         isLoading:false
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
    this.getRead().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   if (this.data.hasmore) {
  //     this.setData({
  //       pn: this.data.pn + 1
  //     })
  //     this.getRead().then(res => {
  //       console.log(res)
  //       if (res.data.length < 1) {
  //         this.setData({
  //           hasmore: false
  //         })
  //       }
  //     })
  //   } 
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})