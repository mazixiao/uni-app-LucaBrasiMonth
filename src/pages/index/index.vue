<template>
	<view class="content">
		<!-- cnpm install node-sass 安装scss -->
		<image class="logo" src="/static/logo.png"></image>

		<button form-type="submit" open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取信息2</button>

		<headers title="YUANYUE" :show_logo="true" :show_bol="true" :show_title="false" backgroundColor="#fff"></headers>

	</view>
</template>

<script>
	// import { Button, Tab, Tabs, List, Cell, Loading, Swipe, SwipeItem } from "vant";
	import headers from "../../components/headers.vue";
	export default {
		name: "index",
		components: {
			headers
			// [Button.name]: Button,
			// [Tab.name]: Tab,
			// [Tabs.name]: Tabs,
			// [List.name]: List,
			// [Cell.name]: Cell,
			// [Loading.name]: Loading,
			// [Swipe.name]: Swipe,
			// [SwipeItem.name]: SwipeItem,
			// [Lazyload.name]: Lazyload,
		},

		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {


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
		  onShareAppMessage: function () {
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
