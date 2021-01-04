<template>
	<view>


		<headers title="签到状态" :show_logo="true" :show_bol="false" :show_title="true" titleColor="#fff" :GoBackWhite="true"
		 :backgroundColor="'linear-gradient(135deg,#9c528a, #d7778c 99%)'"></headers>
		<view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  '#ffffff'}"></view>

		<view :class="['content', {'isIphoneX_': isIphoneX_}]" :style="{'min-height': 'calc(100vh - ' + (bar_Height + 45) + 'px)'}">
			<view class='noyyWrap' :style="{'display':displayI}">
				<image class='noyy' src='/static/images/noyy.png'></image>
				<view class="noyyTitle">暂无团队预约信息</view>
			</view>


			<view class="apply-wrap" :style="{'display':displayN}">
				<view class="item" v-for='(item, index) in albumList' :key="id">
					<view class="head-portrait">
						<image class="pic" v-if="item.headportrait" :src='item.headportrait'></image>
						<image class="pic" v-else src='/static/images/DefaultAvatar.png'></image>
						<text class="text" v-if="item.nlikename">{{item.nlikename}}</text>
						<text class="text" v-else>媛月</text>
					</view>
					<view class="Venue-wrap">
						<view class="Venue">
							<view class="list">
								<image class="pic" src='/static/images/applyList2.png'></image>
								<view class="text">参会会场：{{item.meetingplace}}</view>
							</view>
							<view class="list">
								<image class="pic" src='/static/images/applyList3.png'></image>
								<view class="text">参会日期：{{item.participantstime}}</view>
							</view>
						</view>
						<view class="check" @click="checkFun" :data-id="item.id">查看</view>
					</view>
					<!-- 是否过期 0是 1否 -->
					<image class="Overdue" v-if="item.isexpired == 0" src='/static/images/applyList1.png'></image>
				</view>
				<view class='ToLoad' :style="{'display':ToLoad}">已经全部加载完毕</view>
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

		name: "checkState",
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

				isIphoneX_: getApp().globalData.isIphoneX,


				displayI: '',
				displayN: '',
				ToLoad: '',

				albumList: [],
				isDelegateArray: [],
				page: 0,
				allPage: ''


			}
		},
		onLoad() {



			this.albumList = [];
			this.allAlbum = [];
			this.getAlbum(0, 10)

		},
		methods: {
			checkFun(e) {
				console.log(e.currentTarget.dataset.id, "item");


				let customerid = e.currentTarget.dataset.id;

				// ==========================(109)报名详情================================================
				// 入参：
				//   customerid ///活动报名id

				var wMsgID = desCode.wMsgID();
				var wParam = desCode.to3des(`customerid=${customerid}`);
				var md = mdCode.hexMD5('9999' + '109' + wMsgID + wParam + 'q1w2e3r4t5y6');
				const data = {
					wAgent: 9999,
					wAction: 109,
					wMsgID: wMsgID,
					wParam: wParam,
					wSign: md,
					wImei: 222,
					wVersion: 2,
					wRequestUserID: 4
				}
				api_js.postReq(data, (res) => {
					console.log(res, "报名详情");


					let barcode = res.Data[0].barcodes[0].barcode;
					let barcodeimg = res.Data[0].barcodes[0].barcodeimg;
					let barstatus = res.Data[0].barcodes[0].barstatus;
					let name = res.Data[0].name;
					let meetingplace = res.Data[0].meetingplace;
					let participantstime = res.Data[0].participantstime.split(' ')[0];
					let logo = res.Data[0].logo;

					console.log(barcode, "barcode");
					console.log(barcodeimg, "barcodeimg");
					// (0:未使用 1：已失效 2：已使用 3:已删除)
					console.log(barstatus, "barstatus");
					console.log(name, "name");
					console.log(meetingplace, "meetingplace");
					console.log(participantstime, "participantstime");


					wx.navigateTo({
						url: `../checkInDetail/checkInDetail?customerid=${customerid}&barcode=${barcode}`
					})


				})

			},
			
			

			
			



			// 商家相册列表
			getAlbum(page, size) {
				var that = this;
				let wMsgID = desCode.wMsgID();
				let wParam = desCode.to3des(`userid=${App.globalData.UserID}_page=${page}_size=${size}`);
				let md = mdCode.hexMD5('9999' + '108' + wMsgID + wParam + 'q1w2e3r4t5y6');
				const data = {
					wAgent: 9999,
					wAction: 108,
					wMsgID: wMsgID,
					wParam: wParam,
					wSign: md,
					wImei: 222,
					wVersion: 2,
					wRequestUserID: 4
				}
				api_js.postReq(data, (res) => {
					console.log(res);
					if (res.ReturnCode == 0) {
						if (res.Data != '') {
							this.displayI = 'none';
							this.displayN = '';
						} else {
							this.displayI = '';
							this.displayN = 'none';
						}
						var loadLength = res.Data.length
						if (loadLength <= 9) {
							this.ToLoad = '';
						} else {
							this.ToLoad = 'none';
						}
						this.allPage = res.PageCount;
						if (loadLength > 0) {
							let isDelegateArr = []
							res.Data.map((item, index) => {
								item.participantstime = this.sub(item.participantstime)
							});
							this.albumList = this.albumList.concat(res.Data);
							this.isDelegateArray = isDelegateArr;
						}
					} else if (res.ReturnCode == 110) {
						console.log("空数据");
						that.ToLoad = 'none'
					}
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


		},


		/**
		 * 页面上拉触底事件的处理函数
		 */

		onReachBottom() {
			var that = this;
			// console.log(that.page, that.allPage)
			if (that.page < that.allPage - 1) {
				// that.setData({
				// 	page: that.page + 1
				// })
				that.page = that.page + 1;
				that.getAlbum(that.page, 10)
			} else {
				// that.setData({
				// 	ToLoad: '',
				// });
				that.ToLoad = '';
			}
		}


	}
</script>

<style lang="scss" scoped>
	@import 'checkState.scss';
</style>
