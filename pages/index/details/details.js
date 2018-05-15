// pages/index/details/details.js
Page({
  data:{
    title:"",
    source:"",
    readCount:"",
    time:"",
    newsDetailBody:[]
  },

  //加载详情页面
  onLoad(options){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: options.id
      },
      success : res=>{
          this.setNewsDetailBody(res.data.result)
      }
    })
  },

  //赋值详情页面
  setNewsDetailBody(result) {
    let content=result.content
    console.log("content.length " + content.length)
    let newsDetailBody = []
    for (let i = 0; i < content.length; i++) {
      console.log(content[i])
      newsDetailBody.push({
        type: content[i].type,
        text: content[i].type === 'image' ? content[i].src : content[i].text,
      })
    }
    this.setData({
      title: result.title,
      source: result.source === "" ? "未知来源" : result.source,
      time: result.date.substr(11, 5),
      readCount: "阅读 " + result.readCount,
      newsDetailBody: newsDetailBody
    })
  }
})