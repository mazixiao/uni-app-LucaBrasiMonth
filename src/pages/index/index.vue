<template>
	<view class="content">
		<!-- cnpm install node-sass 安装scss -->
		<image class="logo" src="/static/logo.png"></image>

		<button form-type="submit" open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取信息2</button>

		<headers title="YUANYUE" :show_logo="true" :show_bol="true" :show_title="false" backgroundColor="#fff"></headers>
				<tabbar2 :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#42b983" @click="tabClick"></tabbar2>

		<!-- <tabbar2></tabbar2> -->
		
		
		<navigator open-type="switchTab" url="../my/my">我的</navigator>

	</view>
</template>

<script>
	// import { Button, Tab, Tabs, List, Cell, Loading, Swipe, SwipeItem } from "vant";
	import headers from "../../components/headers.vue";

	import tabBar from '../../components/tabbar.vue';
	import tabbar2 from '../../components/tabbar2.vue';
	// Vue.component('tab-bar', tabBar)

	export default {
		name: "index",
		components: {
			headers,
			tabBar,
			tabbar2
			// 当前tab高亮索引
		},

		data() {
			return {
				currentTabIndex: 0
			}
		},
		onLoad() {

			uni.hideTabBar({
				animation:false
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
