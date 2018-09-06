//index.js
//获取应用实例
import {fetch, login } from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    isLoading: false,
    pn: 1 ,
    hasmore: true
  },
  onLoad () {
   login()
   this.getAllData()
  },
  //获取轮播图数据
  getData () {
   return new Promise((resolve, reject)=>{
     fetch.get('/swiper').then(res => {
       // console.log(res)
       resolve()
       this.setData({
         swiperData: res.data
       })
     }).catch(err => {
       reject(reject)
     })
   })    
  },
  // 获取列表内容
  getContent() {
    return new Promise((resolve, reject) => {
      fetch.get('/category/books').then(res => {
        resolve()
        this.setData({
          mainContent: res.data
        })
      })
    }) 
  },
  //获取更多列表内容
  getMoreContent() {
    return new Promise(resolve => {
      fetch.get('/category/books', {pn:this.data.pn}).then(res => {
        let Arr = [...this.data.mainContent, ...res.data]
        this.setData({
          mainContent: Arr
        })
        resolve(res)
      })
    })   
  }, 
  //获取所有方法
  getAllData() {
    return new Promise(resolve => {
      this.setData({
        isLoading: true
      })
      Promise.all([this.getData(), this.getContent()]).then(() => {
        resolve()
        this.setData({
          isLoading: false
        })
      }).catch(err => { 
        this.setData({
          isLoading: false
        })
      })
    })  
  },
  jumpBook (event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  } ,
  //下拉刷新
  onPullDownRefresh() {
    this.getAllData().then(() => {
      wx.stopPullDownRefresh()
      this.setData({
        pn: 1,
        hasmore: true
      })
    })
  },
  //上拉刷新
  onReachBottom() {
    if (this.data.hasmore) {
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMoreContent().then( res => {
        if(res.data.length < 2){
         this.setData({
           hasmore: false
         })
        }
      })
    } 
  },
})
