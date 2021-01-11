<template>
	<view class="">

		<headers title="签到详情" :show_logo="true" :show_bol="false" :show_title="true" titleColor="#fff" :GoBackWhite="true"
		 :backgroundColor="'linear-gradient(135deg,#9c528a, #d7778c 99%)'"></headers>
		<view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  '#ffffff'}"></view>

		<view :class="['content', {'isIphoneX_': isIphoneX_}]">
			<view class="checkTit-wrap">
				<image class="checkTit" src='/static/images/checkInDetail1.png'></image>
				<view class="text">
					<view class="line"></view>
					<view class="text-con">YUANYUE</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="checkText">报名签到信息</view>

			<view class="check-info">
				<view class="nail"></view>
				<view class="nail nail2"></view>
				<!-- 是否签到图片 -->
				<!-- 二维码状态(0:未使用 1：已失效 2：已使用 3:已删除) -->
				<!-- 未签到 -->
				<image class="isCheckedImg" v-if="checkInDetail.barstatus == 0 && dataStatus == 0" src='/static/images/checkInDetail7.png'></image>
				<!-- 已签到 -->
				<image class="isCheckedImg" v-else-if="checkInDetail.barstatus == 2" src='/static/images/checkInDetail6.png'></image>
				<!-- 已失效 -->
				<image class="isCheckedImg" v-else-if="checkInDetail.barstatus == 1" src='/static/images/checkInDetail8.png'></image>
				<image class="roll" src='/static/images/checkInDetail5.png'></image>

				<view class="check-con">
					<view class="item">
						<view class="names-wrap">
							<image class="icon" src='/static/images/checkInDetail4.png'></image>
							<view class="names">申 请 人：{{checkInDetail.name}}</view>
						</view>
						<view class="info">手 机 号：{{checkInDetail.phone}}</view>
					</view>
					<view class="item">
						<view class="names-wrap">
							<image class="icon" src='/static/images/checkInDetail3.png'></image>
							<view class="names" v-if="checkInDetail.participantstime">参会日期：
								{{checkInDetail.participantstime22}}
							</view>
						</view>
						<view class="info">会场名称：{{checkInDetail.meetingplace}}</view>
					</view>
					<!-- 扫码人员 -->
					<view class="item">
						<view class="names-wrap">
							<image class="icon" src='/static/images/checkInDetail2.png'></image>
							<text class="names">备 &nbsp; &nbsp; 注：</text>
						</view>
						<view class="info readOnly">客户备注：{{checkInDetail.remark ? checkInDetail.remark: ''}}</view>
						<view class="info readOnly">后台备注：{{checkInDetail.ddremark ? checkInDetail.ddremark: ''}}</view>
					</view>


				</view>



			</view>

			<view class="btn" @click="checkedCommit" v-if="dataStatus == 0 && checkInDetail.barstatus == 0">确认签到</view>
			<view class="btn2" v-if="dataStatus == 2 && checkInDetail.barstatus == 0">参会日期未到</view>


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

		name: "scanCheckInDetail",
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
				// 活动报名Id
				customerid: '',
				// 二维码
				barcode: '',
				// 签到详情
				checkInDetail: [],
				Status: 1,
				barstatus: 0,
				nowDate: '',
				dataStatus: null,


			}
		},
		onLoad: function(options) {

			var that = this;
			// this.setData({
			// 	customerid: options.customerid,
			// 	barcode: options.barcode,
			// 	Status: app.globalData.Status,
			// 	nowDate: new Date(),
			// });
			this.customerid = options.customerid;
			this.barcode = options.barcode;
			this.Status = App.globalData.Status;
			this.nowDate = new Date();



			let customerid = this.customerid;
			let barcode = this.barcode;

			var wMsgID = desCode.wMsgID();
			var wParam = desCode.to3des(`customerid=${customerid}_barcode=${barcode}`);
			var md = mdCode.hexMD5('9999' + '110' + wMsgID + wParam + 'q1w2e3r4t5y6');
			const data = {
				wAgent: 9999,
				wAction: 110,
				wMsgID: wMsgID,
				wParam: wParam,
				wSign: md,
				wImei: 222,
				wVersion: 2,
				wRequestUserID: 4
			}
			api_js.postReq(data, (res) => {
				console.log(res, "签到记录详情");


				// return;
				// this.setData({
				// 	checkInDetail: res.Data[0],
				// 	barstatus: res.Data[0].barstatus
				// });
				this.checkInDetail = res.Data[0];
				// this.checkInDetail.participantstime = this.sub(this.checkInDetail.participantstime);
				
				// 深拷贝
				this.checkInDetail.participantstime22 = this.sub(JSON.parse(JSON.stringify(this.checkInDetail.participantstime)));
				this.barstatus = res.Data[0].barstatus;
				console.log(this.barstatus, "app.globalData.Status");

				var Participantstime = res.Data[0].participantstime;
				var Termofvalidity = res.Data[0].termofvalidity;

				console.log(Participantstime, "Participantstime");
				console.log(Termofvalidity, "Termofvalidity");

				console.log(this.barstatus, "this.barstatus")
				switch (this.barstatus) {
					case 0:
						/// 判断会议时间
						console.log(this.barstatus, "0");
						console.log(this.checkInDetail.participantstime)
						var NowTime = that.nowDate //当前时间
						this.tab(Participantstime, NowTime, Termofvalidity);
						break;
					case 1:
						///判断按钮显示隐藏
						console.log(this.barstatus, "1");

						break;
					case 2:
						///判断按钮显示隐藏

						console.log(this.barstatus, "2");

						break;
				}

			})

		},


		methods: {
			tab00(date1, date2, date3) {

				console.log(9999)
				var that = this;
				// var oDate1 = util.formatTime(new Date(date1));
				// var oDate2 = util.formatDate(new Date(date2));
				var oDate1 = new Date(date1); //到访日期
				var oDate2 = new Date(date2); //当前时间
				var oDate3 = new Date(date3); //当前时间


				console.log('oDate3', oDate3);
				console.log('oDate2', oDate2);
				console.log('oDate1', oDate1);

				if (oDate1.getTime() <= oDate2.getTime()) {

					if (oDate3.getTime() <= oDate2.getTime()) {
						// 已失效
						// that.setData({
						// 	dataStatus: 1
						// })
						that.dataStatus = 1;
						console.log('活动已失效');
					} else {
						//进行中
						// that.setData({
						// 	dataStatus: 0
						// })
						that.dataStatus = 0;
						console.log('活动进行中');
					}
				} else if (oDate1.getTime() > oDate2.getTime()) {
					// that.setData({
					// 	dataStatus: 2
					// })
					that.dataStatus = 2;
					console.log('参会日期未到');
				} else {
					// that.setData({
					// 	dataStatus: 1
					// })
					that.dataStatus = 1;
					console.log('that.dataStatus = 1');
				};


				console.log(that.dataStatus, "that.dataStatus哈哈哈");
			},




			tab(date1, date2, date3) {

				console.log(21122)
				var that = this;
				// var oDate1 = util.formatTime(new Date(date1));
				// var oDate2 = util.formatDate(new Date(date2));
				var oDate1 = new Date(date1); //到访日期
				var oDate2 = new Date(date2); //当前时间
				var oDate3 = new Date(date3); //当前时间



				console.log(oDate1, 'oDate1');
				console.log(oDate2, 'oDate2');
				console.log(oDate3, 'oDate3');
				

				if (oDate1.getTime() <= oDate2.getTime()) {

					if (oDate3.getTime() <= oDate2.getTime()) {
						// 已失效
						// that.setData({
						// 	dataStatus: 1
						// });
						that.dataStatus = 1;
						console.log('活动已失效');
					} else {
						//进行中
						// that.setData({
						// 	dataStatus: 0
						// })
						that.dataStatus = 0;
						console.log('活动进行中');
					}
				} else if (oDate1.getTime() > oDate2.getTime()) {
					// that.setData({
					// 	dataStatus: 2
					// })
					that.dataStatus = 2;
					console.log('参会日期未到');
				} else {
					// that.setData({
					// 	dataStatus: 1
					// })
					that.dataStatus = 1;
				};


				console.log(that.dataStatus, "that.dataStatus哈哈哈");
			},




			// 时间格式化
			// 2021/1/4 10:28:00 => 2021年1月4日
			sub(val) {
				var arr = val.split(' ');
				var GoTime = arr[0];
				var timeArray = GoTime.split('/')
				// var GoTime = GoTime1.replace(/-/g, "/");
				return timeArray == '' ? '' : timeArray[0] + '年' + timeArray[1] + '月' + timeArray[2] + '日';
			},


			checkedCommit() {
				var wMsgID = desCode.wMsgID();
				var wParam = desCode.to3des(`barcode=${this.barcode}`);
				var md = mdCode.hexMD5('9999' + '112' + wMsgID + wParam + 'q1w2e3r4t5y6');
				const data = {
					wAgent: 9999,
					wAction: 112,
					wMsgID: wMsgID,
					wParam: wParam,
					wSign: md,
					wImei: 222,
					wVersion: 2,
					wRequestUserID: 4
				}
				api_js.postReq(data, (res) => {
					console.log(res, "扫码签到");

					if (res.ReturnCode == 0) {
						let customerid = this.customerid;
						let barcode = this.barcode;
						var wMsgID = desCode.wMsgID();
						var wParam = desCode.to3des(`customerid=${customerid}_barcode=${barcode}`);
						var md = mdCode.hexMD5('9999' + '110' + wMsgID + wParam + 'q1w2e3r4t5y6');
						const data = {
							wAgent: 9999,
							wAction: 110,
							wMsgID: wMsgID,
							wParam: wParam,
							wSign: md,
							wImei: 222,
							wVersion: 2,
							wRequestUserID: 4
						}
						api_js.postReq(data, (res) => {
							console.log(res, "签到记录详情");

							// this.setData({
							// 	checkInDetail: res.Data[0],
							// 	barstatus: res.Data[0].barstatus
							// });

							this.checkInDetail = res.Data[0];
							this.barstatus = res.Data[0].barstatus;
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'scanCheckInDetail.scss';
</style>
