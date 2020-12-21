<template>
	<view class="content">


		<!-- <headers ></headers> -->


		<!-- 		<tabbar2 :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#42b983" @click="tabClick"></tabbar2> -->

		<!-- <tabbar navActive='1'></tabbar> -->


		<!-- <headers title="" :show_logo="{true}" :show_title="false" :show_bol="true"></headers> -->

		<view class="content">
			<image v-if="imgSrc" class="enterBg" mode="aspectFill" :src='imgSrc'></image>

			<video v-if="videoSrc" :src="videoSrc" autoplay="{{true}}" loop="{{true}}" controls="{{false}}"
			 enable-progress-gesture="{{false}}" object-fit="cover"></video>

			<div class="bottom-info">
				<button form-type='submit' @click="goIndex" class="button" value="点 击 开 启">点 击 开 启</button>
				<view class="support">深圳银创网络科技提供技术支持</view>
			</div>
		</view>



	</view>
</template>

<script>
	import headers from "../../components/headers.vue";
	import tabBar from '../../components/tabbar.vue';
	import tabbar2 from '../../components/tabbar2.vue';
	import tabbar from '../../components/tabbar.vue';



	const mdCode = require('../../utils/md5.js');
	const desCode = require('../../utils/aesUtil.js');
	const api_js = require("../../utils/api.js");

	export default {

		name: "enter",
		components: {
			headers,
			tabbar2,
			tabbar
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
				// this.imgSrc = res.Data[0].logo;
				// console.log(this.imgSrc, "res");

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
	@import 'enter.scss';
</style>
