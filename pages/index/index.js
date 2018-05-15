//index.js
var app = getApp()
var newsType = [
  { 'idx': "0",'type': 'gn', 'name': '国内', 'select': true },
  { 'idx': "1",'type': 'gj', 'name': '国际', 'select': false },
  { 'idx': "2",'type': 'cj', 'name': '财经', 'select': false },
  { 'idx': "3",'type': 'yl', 'name': '娱乐', 'select': false },
  { 'idx': "4",'type': 'js', 'name': '军事', 'select': false },
  { 'idx': "5",'type': 'ty', 'name': '体育', 'select': false },
  { 'idx': "6",'type': 'other', 'name': '其他', 'select': false }
]

Page({
  data:{
    titleListItem: newsType,
    type:"gn",
    newsList: [],

  },

  onLoad(){
    console.log("newsType " + newsType[0].idx)
    this.getNewsList()
  },
  
  //点击标题栏更新新闻列表
  getNewsList: function (e) {
    //判断是否第一次，如果是则跳过
      if(e){
        var dataset = e.target.dataset;
        var idx = e.target.dataset.idx;
        
        for (var i in newsType) {
          console.log("i " + i + " idx " + idx)
          if(i!==idx)
          {
          newsType[i].select = false;
          }
          else{
            newsType[i].select = true;
            this.data.type = newsType[i].type
          }
          console.log("i " + newsType[i].select)
        }
      }
      this.requestNewsList()
  },

  //获取请求新闻列表
  requestNewsList(callback)
  {
    //请求url
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.type
      },
      success: res => {
        let result = res.data.result
        this.setNewsList(result)
        this.setData({
          titleListItem : newsType
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  //赋值新闻列表
  setNewsList(result){
    console.log("setNewsList " + result.length)
    let newsList=[]
    for (let i = 0; i < result.length; i++){
      newsList.push({
        id:result[i].id,
        text: result[i].title,
        source: result[i].source === "" ? "未知来源" : result[i].source,
        time: result[i].date.substring(11,16),
        iconPath: result[i].firstImage
      })
    }
    this.setData({
      newsList: newsList
    })
    console.log("newsList" + this.data.newsList[0].id)
  },

//切换到第二个页面
  onTabNewsDetails(e) {
    console.log("onTabNewsDetails " + e.currentTarget.dataset.id)
    wx.showToast("onTabNewsDetails")
    wx.navigateTo({
      url: '/pages/index/details/details?id=' + e.currentTarget.dataset.id
    })
  },

//下拉刷新
  onPullDownRefresh: function () {
    this.requestNewsList(()=>{
    wx.stopPullDownRefresh()
    })
    }
})
