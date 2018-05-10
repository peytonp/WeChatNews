//index.js

var newsType = [
  { 'id': 'gn', 'name': '国内', 'select': false },
  { 'id': 'gj', 'name': '国际', 'select': false },
  { 'id': 'cj', 'name': '财经', 'select': false },
  { 'id': 'yl', 'name': '娱乐', 'select': false },
  { 'id': 'js', 'name': '军事', 'select': false },
  { 'id': 'ty', 'name': '体育', 'select': false },
  { 'id': 'other', 'name': '其他', 'select': false }
]

Page({
  data:{
    titleListItem: newsType,
    type:'gn'
  },

  onLoad(){
    this.getNewsList()
  },

  //获取新闻列表
  getNewsList(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
    })
    success: res => {
      console.log("成功获取第一个页面getNewsList(）" + this.data.type)
      let result = res.data.result
      this.setNewsList(result)
    }

  },
  setNewsList(result){

  }


  
})
