<template>
	<view class="content">
		<headers title="YUANYUE" :show_logo="true" :show_bol="true" :show_title="false" backgroundColor="#fff"></headers>
		<view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  '#ffffff'}"></view>
		<tabbar navActive='0'></tabbar>






<!-- <view class="content {{isIphoneX_ ? 'isIphoneX_': ''}}"> -->
<view class="content">
  <image class="indexImg1" mode="" src='/static/images/index1.png'></image>
  <view class="link-wrap">
    <view class="item" bindtap="openLoginFun">
      <image class="bg" mode="" src='/static/images/index2.png'></image>
      <view class="item-con">
          <image class="icon" mode="" src='/static/images/index3.png'></image>
          <view class="cn">活动报名</view>
          <view class="en">EVENT REGISTRATION</view>
      </view>
    </view>
    <view class="item" bindtap="openLoginFun2">
      <image class="bg" mode="" src='/static/images/index4.png'></image>
      <view class="item-con">
          <image class="icon" mode="" src='/static/images/index5.png'></image>
          <view class="cn">报名记录</view>
          <view class="en">REGISTRATION RECORD</view>
      </view>
    </view>
  </view>


<!-- <view class="isLogin" wx:if="{{isLogin}}">
  <view class="isLogin-con">
    <image class="closes" bindtap="closeLoginFun" mode="" src='../../images/close.png'></image>
    <view class="login-text">
      <view class="cn">请先去登录</view>
      <view class="en">PLEASE LOG IN FIRST</view>
    </view>
    <view class="button-wrap">
      <view class="button" bindtap="closeLoginFun">取消</view>
      <view class="button goLogin" bindtap="goLoginFun">去登录</view>
    </view>
  </view>
</view> -->


</view>








	</view>
</template>

<script>
	// import { Button, Tab, Tabs, List, Cell, Loading, Swipe, SwipeItem } from "vant";
	import headers from "../../components/headers.vue";

	import tabBar from '../../components/tabbar.vue';
	import tabbar2 from '../../components/tabbar2.vue';
	import tabbar from '../../components/tabbar.vue';
	// Vue.component('tab-bar', tabBar)

	export default {
		name: "index",
		components: {
			headers,
			tabBar,
			tabbar2,
			tabbar,
			// 当前tab高亮索引
		},

		data() {
			return {
				currentTabIndex: 0
			}
		},
		onLoad() {

			uni.hideTabBar({
				animation: false
			})

			// 更改顶部文字颜色
			// uni.setNavigationBarColor({
			// 	frontColor: "#ffffff",	//文字颜色
			// 	backgroundColor: "#007AFF"	//底部背景色
			// })


		},
		methods: {
			tabClick(index) {
				console.log('返回tabBar索引：' + index)
				this.currentTabIndex = index
			},


			getuserinfo: function() {
				// wx登录
				wx.login({
					success(res) {
						if (res.code) {
							//发起网络请求
							var code = res.code
							// 获取微信用户信息
							wx.getUserInfo({
								success: function(res) {
									var userInfo = res.userInfo
									var nickName = userInfo.nickName
									var avatarUrl = userInfo.avatarUrl
									var gender = userInfo.gender //性别 0：未知、1：男、2：女
									var province = userInfo.province
									var city = userInfo.city
									var country = userInfo.country
								},
								fail: res => {
									// 获取失败的去引导用户授权 
								}
							})

						} else {

						}
					}
				})
			},


		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			return {
				title: '媛月幸福汇',
				path: '/pages/index/index?isShare=1',
				imageUrl: '/images/DefaultAvatar.png',
			}
		},

	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';
</style>




<!-- 21         onLoad() {
22             console.log('页面加载')
23         },
24         onShow() {
25             console.log('页面显示')
26         },
27         onReady(){
28             console.log('页面初次显示')
29         },
30         onHide() {
31             console.log('页面隐藏')
32         },
33         onUnload() {
34             console.log('页面卸载')
35         },
36         onBackPress(){
37             console.log('页面返回...')
38         },
39         onShareAppMessage() {
40             console.log('分享!')
41         },
42         onReachBottom() {
43             console.log('下拉加载...')
44         },
45         onPageScroll(){
46             console.log('页面滚动...')
47         },
48         onPullDownRefresh() {
49             console.log('上拉刷新...')
50             uni.stopPullDownRefresh();
51         }, -->
