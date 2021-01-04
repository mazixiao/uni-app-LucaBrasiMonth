<template>
	<!-- <view class="page" style="background-image:url({{logo}});min-height:100vh"> -->
	<view class="page" :style="{'background-image': 'url(' + logo + ')', 'min-height': '100vh'}">
		<!-- imagePath -->
		<headers title="二维码海报" :show_logo="true" :show_bol="false" :show_title="true" titleColor="#fff" :GoBackWhite="true"
		 :backgroundColor="'transparent'"></headers>
		<view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  'transparent'}"></view>

		<view :class="['content', {'isIphoneX_': isIphoneX_}, {'active': isDisabled}]">


			<!-- :class="bottom-info {{ isDisabled ? 'active' : ''}}" -->
			<view :class="['bottom-info', {'active': isDisabled}]">


				<!-- // 二维码状态(0:未使用 1：已失效 2：已使用 3:已删除) -->

				<view class="error" v-if="barstatus == 1"><text>!</text>抱歉，活动已过期！</view>
				<view class="error" v-if="barstatus == 2"><text>!</text>已使用</view>
				<image class="QRCode1" mode="aspectFill" src='/static/images/QRCode1.png'></image>
				<view class="btns">扫码签到</view>
				<view class="erweima-wrap">
					<image class="QRCode-img" id="QRCode-img" @click="showBrandStoryImage" mode="" :src='barcodeimg'></image>
					<view class="text">{{barcode}}</view>
				</view>
				<view class="introduct">
					<image class="QRCode2" mode="aspectFill" src='/static/images/QRCode2.png'></image>
					<view class="introduct-wrap">
						<view class="introduct-tit">亲爱的{{name}}，此为您的应邀二维码</view>
						<view class="introduct-con">
							欢迎您参加媛月女子学堂「{{meetingplace}}」，请于{{participantstime}}凭此二维码现场签到,谢谢! 
						</view>
					</view>
				</view>
				<view class="support">深圳银创网络科技提供技术支持</view>
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

		name: "QRCode",
		components: {
			headers,
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

				isIphoneX_: App.globalData.isIphoneX,

				// 二维码是否失效
				isDisabled: false,
				imagePath: 'https://p1.music.126.net/hbEcXNsM7Ay-lGWXsx9hmQ==/109951165444313716.jpg?param=200y200',

				// 二维码code
				barcode: '',
				// 二维码图片
				barcodeimg: '',
				// 二维码状态(0:未使用 1：已失效 2：已使用 3:已删除)
				barstatus: null,
				// 会议名称
				meetingplace: '',
				// 姓名
				name: '',
				// 日期
				participantstime: '',
				logo: '',

			}
		},
		onLoad(options) {

		
				this.barcode = options.barcode;
				this.barcodeimg = options.barcodeimg;
				this.barstatus = options.barstatus;
				this.meetingplace = options.meetingplace;
				this.name = options.name;
				this.participantstime = this.sub(options.participantstime);
				this.logo = options.logo;
		

			if (this.barstatus == 0) {
				this.isDisabled = false;
			} else {
				this.isDisabled = true;
			}


		},
		methods: {

			showBrandStoryImage(e) {
				var imagePath = this.barcodeimg;
				// var imagePath = that.data.BarCodeImg;
				console.log(imagePath, "imagePathimagePath")
				wx.previewImage({
					current: imagePath, // 当前显示图片的http链接 
					urls: [imagePath] // 需要预览的图片http链接列表 
				})

			},
			// 时间格式化
			// 2021/1/4 10:28:00 => 2021年1月4日
			sub(val) {
			  var arr = val.split(' ');
			  var GoTime = arr[0];
			  var timeArray = GoTime.split('/')
			  // var GoTime = GoTime1.replace(/-/g, "/");
			  return timeArray == '' ? '' : timeArray[0] + '年' + timeArray[1] + '月' + timeArray[2] + '日';
			}


		}
	}
</script>

<style lang="scss" scoped>
	@import 'QRCode.scss';
</style>
