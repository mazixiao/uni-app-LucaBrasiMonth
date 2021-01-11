<template>
	<view class="">

		<!-- <header title="YUANYUE" show_logo="{{true}}" show_bol="{{true}}" show_title="{{false}}" titleColor="#fff"
  GoBackWhite=""></header> -->

		<headers title="YUANYUE" :show_logo="true" :show_bol="true" :show_title="false" titleColor="#fff" :GoBackWhite="false"></headers>
		<tabbar navActive='0'></tabbar>
		<view :class="['content', {'isIphoneX_': isIphoneX_}]">
			<view class="apply-top">
				<image class="applyImg" mode="" src='/static/images/apply1.png'></image>
				<view class="introduct">
					<view class="en">SIGN IN</view>
					<view class="cn">媛月幸福汇</view>
					<view class="en-small">TO BE A CONFIDENT BEAUTIFUL WOMAN</view>
				</view>
			</view>

			<view class="check-in" @click="EwmFun">
				<image class="checkImg" mode="" src='/static/images/scanPeople1.png'></image>
				<view class="text">
					<view class="en">扫码签到</view>
					<view class="cn">RichScan</view>
					<image class="img" mode="" src='/static/images/scanPeople2.png'></image>
				</view>
			</view>








		</view>



	</view>
</template>

<script>
	import headers from "../../components/headers.vue";
	import tabbar from '../../components/tabbar.vue';



	const mdCode = require('../../utils/md5.js');
	const desCode = require('../../utils/aesUtil.js');
	const api_js = require("../../utils/api.js");
	let App = getApp()
	export default {

		name: "scanPeople",
		components: {
			headers,
			tabbar
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
				bar_Height: wx.getSystemInfoSync().statusBarHeight,

				isIphoneX_: App.globalData.isIphoneX,


			}
		},
		onLoad() {
			uni.hideTabBar({
				animation: false
			});






		},
		methods: {

			EwmFun() {
				var that = this;
				var show;

				if (App.globalData.LoginStatus == 1) {
					wx.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 2000,
						mask: true,
					})
					return;
				};



				wx.scanCode({
					success: (res) => {

						console.log("生成的条形码" + res.result);

						var code = res.result;
						if (code.length == 15) {
							console.log("跳转")


							uni.navigateTo({
								url: `../scanCheckInDetail/scanCheckInDetail?customerid=0&barcode=${code}`
							})

						} else {
							wx.showToast({
								title: '扫码失败,请重试',
								icon: 'none',
								duration: 2000,
								mask: true,
							})
							that.EwmFun();
						}
					},
					fail: (res) => {
						wx.showToast({
							title: '扫码失败',
							icon: 'none',
							duration: 2000,
							mask: true,
						})
					},
					complete: (res) => {
						console.log('complete', res);
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import 'scanPeople.scss';
</style>
