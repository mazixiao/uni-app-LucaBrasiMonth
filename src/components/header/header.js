Component({
  /* 组件的属性列表 */
  properties: {
    title: {			// 设置标题
      type: String,
      value: ''
    },
    show_bol: {			// 控制返回箭头是否显示
      type: Boolean,
      value: false
    },
    show_logo: {
      type: Boolean,
      value: false
    },
    show_title: {
      type: Boolean,
      value: false
    },
    my_class: {			// 控制样式
      type: Boolean,
      value: false
    },
    show_search: {
      type: Boolean,
      value: false
    },

    backgroundColor: {
      type: String,
      value: 'transparent'
    },

    titleColor: {
      type: String,
      value: ''
    },
    GoBackWhite: {
      type: Boolean,
      value: false
    }

  },
  /* 组件的初始数据 */
  data: {
    type: "组件",
	// 获取手机状态栏高度
    bar_Height: wx.getSystemInfoSync().statusBarHeight		
  },
  /* 组件的方法列表 */
  methods: {
    goBack: function () {					// 返回事件
      wx.navigateBack({
        delta: 1,
      })
    },
    goSearch: function () {
      wx.navigateTo({
        url: '../search/search',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      })
    }
  },

  onLoad: function () {
    
  }


})
