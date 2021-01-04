<template>
	<view>


		<headers title="签到详情" :show_logo="true" :show_bol="false" :show_title="true" titleColor="#fff" :GoBackWhite="true"
		 :backgroundColor="'linear-gradient(135deg,#9c528a, #d7778c 99%)'"></headers>
		<view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  '#ffffff'}"></view>

		<!-- 		<view :class="['content', {'isIphoneX_': isIphoneX_}]" :style="{'min-height': 'calc(100vh - ' + (bar_Height + 45) + 'px)'}">
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
					<image class="Overdue" v-if="item.isexpired == 0" src='/static/images/applyList1.png'></image>
				</view>
				<view class='ToLoad' :style="{'display':ToLoad}">已经全部加载完毕</view>
			</view>
		</view> -->


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
				<!-- <image class="checkInDetail66" src='../../images/checkInDetail66.png'></image> -->
				<image class="checkInDetail66" src='http://clouddn.yinchtv.com/FpEDuxrmhDLbXqDLTRtvPmcb23JY'></image>
				<view class="nail"></view>
				<view class="nail nail2"></view>
				<!-- 是否签到图片 -->
				<!-- 二维码状态(0:未使用 1：已失效 2：已使用 3:已删除) -->
				<!-- checkInDetail6  已签到 -->
				<!-- checkInDetail7  未签到 -->
				<!-- checkInDetail8  已失效 -->
				<image class="isCheckedImg" v-if="checkInDetail.barstatus == 0" src='/static/images/checkInDetail7.png'></image>
				<image class="isCheckedImg" v-else-if="checkInDetail.barstatus == 2" src='/static/images/checkInDetail6.png'></image>
				<image class="isCheckedImg" v-else="checkInDetail.barstatus == 1" src='/static/images/checkInDetail8.png'></image>
				<!-- <image class="roll" src='/static/images/checkInDetail5.png'></image> -->

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
							<view class="names" v-if="checkInDetail.participantstime">参会日期：{{checkInDetail.participantstime}}</view>
						</view>
						<view class="info">会场名称：{{checkInDetail.meetingplace}}</view>
					</view>
					<!-- 普通用户 -->
					<view class="item">
						<view class="names-wrap">
							<image class="icon" src='/static/images/checkInDetail2.png'></image>
							<!-- <text class="names" decode="{{true}}">备 &nbsp; &nbsp; 注：</text> -->
							<text class="names">备 &nbsp; &nbsp; 注：</text>
						</view>
						<view class="info readOnly">{{checkInDetail.remark ? checkInDetail.remark: '暂无'}}</view>
					</view>
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

		name: "checkInDetail",
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

				// 活动报名Id
				customerid: '',
				// 二维码
				barcode: '',
				// 签到详情
				checkInDetail: [],

				Status: 1


			}
		},
		onLoad: function(options) {


			this.customerid = options.customerid;
			this.barcode = options.barcode;
			this.Status = App.globalData.Status;




			let customerid = this.customerid;
			let barcode = this.barcode;

			//barstatus  二维码状态(0:未使用 1：已失效 2：已使用 3:已删除)

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

				this.checkInDetail = res.Data[0];
				this.checkInDetail.participantstime = this.sub(this.checkInDetail.participantstime);


			})


			console.log(this.Status, "app.globalData.Status")
		},
		methods: {
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

		}


	}
</script>

<style lang="scss" scoped>
	@import 'checkInDetail.scss';
</style>
