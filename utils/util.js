const baseUrl = "https://m.yaojunrong.com"
const fetch = {
  http (url, method, data){
    return new Promise((resolve, reject)=> {
      let token = wx.getStorageSync('token')
      let header = {    
        'content-type': 'application/json'
      }
      if(token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res) {
          // console.log(res)
          if(res.header.Token || res.header.token){
            wx.setStorageSync('token', res.header.Token || res.header.token)
          }
          resolve(res.data)
        },
        fail(err) {
           reject(err)
        }
      })
    })
  },
  get (url, data) {
   return  this.http(url, 'GET', data)
  }, 
  post (url, data) {
    return this.http(url, 'POST', data)
  },
  delete(url, data) {
    return this.http(url, 'DELETE', data)
  }
}
const login = () => {
  wx.login({
    success(res){
      fetch.post('/login', {
        code:res.code,
        appid: "wx9a6c7a960b11b261",
        secret: "4043b47a04a3d1a6b675b106819dc2ae"
      }).then(res =>{
        console.log(res)
      })
    }
  })
}
exports.fetch = fetch;
exports.login = login;