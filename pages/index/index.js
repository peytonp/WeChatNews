//index.js

const newsType = {'gn':'国内','gj':'国际','cj':'财经','yl':'娱乐','js':'军事','ty':'体育','other':'其他'}


Page({
  data:{
    titleListItem: newsType
  },



  getNewsList(newsType){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType 
      },
      success: res => {
      },
      complete: () => {
        callback && callback()
      }
   })
  }

})
