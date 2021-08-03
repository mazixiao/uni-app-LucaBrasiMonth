<template>
	<view>
		<headers title="签到详情" :show_logo="true" :show_bol="false" :show_title="true" titleColor="#fff"
			:GoBackWhite="true" :backgroundColor="'linear-gradient(135deg,#9c528a, #d7778c 99%)'"></headers>
		<view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  '#ffffff'}"></view>

		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<image class="imgs" mode="" src='../../static/images/attention.jpg'></image>
		<image class="imgs" mode="" src='../../static/images/attention.jpg'></image>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		<view>分包测试</view>
		
	</view>
	</view>

	</view>
</template>

<script>
	import headers from "../../../components/headers.vue";
	import tabbar from '../../../components/tabbar.vue';

	const mdCode = require('../../../utils/md5.js');
	const desCode = require('../../../utils/aesUtil.js');
	const api_js = require("../../../utils/api.js");
	let App = getApp()
	export default {

		name: "test",
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
				imgSrc: '',
				videoSrc: '',
			}
		},
		onLoad() {
			uni.hideTabBar({
				animation: false
			});

			let wMsgID = desCode.wMsgID();
			// let wParam = desCode.to3des();
			let wParam = '';
			let md = mdCode.hexMD5('8888' + '100' + wMsgID + wParam + 'q1w2e3r4t5y6');
			const data = {
				wAgent: 8888,
				wAction: 100,
				wMsgID: wMsgID,
				wParam: wParam,
				wSign: md,
				wImei: 222,
				wVersion: 2,
				wRequestUserID: 4
			}
			api_js.postReq(data, (res) => {
				if (res.ReturnCode == 0) {
					if (res.Data[0].categorykey == '1') {
						this.imgSrc = res.Data[0].logo;
					} else if (res.Data[0].categorykey == '2') {
						this.videoSrc = res.Data[0].logo;
					}
				}
			});

		},
		methods: {
			goIndex() {
				console.log(112)
				uni.switchTab({
					url: `../index/index`
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'test.scss';
</style>
