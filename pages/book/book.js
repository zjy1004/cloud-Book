// pages/book/book.js
import { fetch } from "../../utils/util.js"
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      titleId: "",
      bookId: "",
      article: {},
      title: "",
      catalog: [],
      isShow: false,
      isLoading: false,
      font: 40
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
       this.setData({
         titleId: options.id,
         bookId: options.bookId
       })
    this.getData()
    this.getCatalog()
  },
getData() {
  this.setData({
    isLoading: true
  })
  fetch.get(`/article/${this.data.titleId}`).then(res =>{
    console.log(res)
    this.setData({
      article: res.data.article.content,
      title: res.data.title,
      isLoading: false
    })
  }).catch(err => {
    this.setData({
      isLoading: false
    })
  })
},
//获取目录
getCatalog() {
  fetch.get(`/titles/${this.data.bookId}`).then(res => {
    console.log(res)
    this.setData({
      catalog: res.data
    })
  })
},
//点击显示目录
toggleCatalog() {
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },
//点击目录跳转至内容
  handleGet(event) {
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId: id
    })
    this.getData()
    this.toggleCatalog()
  },
  //点击字体放大
  handleAdd() {
     this.setData({
       font: this.data.font + 2
     })
  },
  //点击字体缩小
  handleReduce() {
    if (this.data.font <= 24){
      wx.showModal({
        title: "提示",
        content: "字体太小影响视力",
        showCancel: false
      })
    }else{
      this.setData({
        font: this.data.font - 2
      })
    }
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
  
  }
})