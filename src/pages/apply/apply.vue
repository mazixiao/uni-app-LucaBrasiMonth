<template>
	<view class="">


		<headers title="活动报名" :show_logo="true" :show_bol="false" :show_title="true" titleColor="#fff" :GoBackWhite="true"></headers>
		<!-- <view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  '#ffffff'}"></view> -->





		<!-- 		<header title="活动报名" show_logo="{{true}}" show_bol="{{false}}" show_title="{{true}}" titleColor="#fff" GoBackWhite="{{true}}"></header> -->

		<view :class="['content', {'isIphoneX_': isIphoneX_}]">
			<view class="apply-top">
				<image class="applyImg" mode="" src='/static/images/apply1.png'></image>
				<view class="introduct">
					<view class="en">APPLICATION</view>
					<view class="cn">媛月幸福汇</view>
					<view class="en-small">TO BE A CONFIDENT BEAUTIFUL WOMAN</view>
				</view>
			</view>


			<view class="form-wrap">
				<form @submit="formSubmit" class='form'>
					<view class="inputs">
						<view class="input-wrap">
							<input type="text" placeholder-style="color: #b0b0b0;" placeholder="请填写真实姓名" v-model.trim='name' @input="checkName(name)" />
							<text class="required">*</text>
							<view :class="['error', {'active': errorName}]">请填写姓名</view>
						</view>
						<view class="input-wrap">
							<input type="number" placeholder-style="color: #b0b0b0;" placeholder="请填写手机号" v-model.trim='phone' @input="checkPhoness2(phone)"
							 maxlength="11" />
							<text class="required">*</text>
							<view :class="['error', {'active': errorPhone}]">请填写正确的手机号</view>
						</view>
						<view class="input-wrap haveShadow" @click="activeVenueShowFun">
							<input type="text" placeholder-style="color: #b0b0b0;" placeholder="请选择会场|日期" v-model.trim='houseList2[house].tile' />
							<text class="required">*</text>
							<view :class="['error', {'active': errorHouse}]">请选择会场|日期</view>
							<image class="icon" mode="" src='/static/images/moreIcon.png'></image>
						</view>
						<view class="input-wrap haveTextarea">
							<view class="textarea-tit">备注（选填）</view>
							<textarea maxlength="140" @input="checkHouse(remark)" placeholder-style="color: #b0b0b0;" v-model.trim='remark'
							 placeholder="仅限140字内…" />

							</view>
					</view>
					<button form-type='submit' class="commitBtn">提 交</button>
					<!-- <button class="loginBtn" form-type="submit">登录</button> -->
				</form>
			</view>





			<!-- 弹层 -->
			<view class="cctivityRegister" v-if="activeVenueShow">
				<view class="shadow"></view>
				<view class="bottom-dialog-body">
					<view class="topBg">
						<view class="modaleTitle">参会会场/日期</view>
						<view class="topCancelBtn" @click="cancel">取消</view>
					</view>
					<!-- 选择区域 -->
					     <scroll-view class="tabelView" scroll-y="true">
							 <!-- "register {{house == index ? 'active': ''}}" -->
        <view :class="['register', {'active': house == index}]" v-for='(item, index) in houseList2' :key="id" @click="activeVenueFun(index)">
          <view class="text">{{item.tile}}</view>
          <image class="itmeSelectImage" src="/static/images/gou.png"></image>
        </view>
      </scroll-view>
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

		name: "apply",
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
				userInfo: {},
				hasUserInfo: false,
				canIUse: wx.canIUse('button.open-type.getUserInfo'),


				bar_Height: wx.getSystemInfoSync().statusBarHeight,

				isIphoneX_: App.globalData.isIphoneX,
				// 是否登录
				isLogin: false,


				errorPhone: false,
				errorName: false,
				errorDate: false,
				errorHouse: false,

				// 姓名
				name: '',
				// 手机号
				phone: '',
				// 日期
				date: '',
				// 会场
				house: -1,
				// 会场集合
				houseList2: [{
					name: '服务质量',
					id: 20
				}, {
					name: '服务品质',
					id: 24
				}, {
					name: '服务速度',
					id: 25
				}],
				remark: '',
				// 是否显示弹层
				activeVenueShow: false,
				input_bottom: 0

			}
		},
		onLoad() {
			uni.hideTabBar({
				animation: false
			})
		},
		methods: {

			// 姓名验证
			checkName(value) {
				if (value == '') {
					// this.setData({
					// 	errorName: true
					// });
					this.errorName = true;
					return false;
				} else {
					// this.setData({
					// 	errorName: false
					// });
					this.errorName = false;
					return true;
				}
			},

			// 号码验证(手机)
			checkPhoness(phone) {

				if (!/^1[34578]\d{9}$/.test(phone)) {
					// this.setData({
					// 	errorPhone: true
					// });
					this.errorPhone = true;
					return false;
				} else {
					// this.setData({
					// 	errorPhone: false
					// });
					this.errorPhone = false;
					return true;
				}
			},



			checkPhoness2(phone) {

				if (!/^1[34578]\d{9}$/.test(phone)) {

					if (phone.length == 0 || phone.length == 11) {
						// this.setData({
						// 	errorPhone: true
						// });
						this.errorPhone = true;
						return false;
					}

				} else {
					// this.setData({
					// 	errorPhone: false
					// });
					this.errorPhone = false;
					return true;
				}
			},




			// 日期验证
			checkDate(value) {
				if (value == '') {
					// this.setData({
					// 	errorDate: true
					// });

					this.errorDate = true;
					return false;
				} else {
					// this.setData({
					// 	errorDate: false
					// });
					this.errorDate = false;
					return true;
				}
			},


			// 会场验证
			checkHouse(value) {
				if (value == -1) {
					// this.setData({
					// 	errorHouse: true
					// });
					this.errorHouse = true;
					return false;
				} else {
					// this.setData({
					// 	errorHouse: false
					// });
					this.errorHouse = false;
					return true;
				}
			},



			// // 赋值和判断(手机号)
			// phoneFun(e) {
			// 	this.setData({
			// 		phone: e.detail.value.replace(/\s+/g, '')
			// 	});
			// 	this.checkPhoness2(this.data.phone);
			// 	console.log(this.data.phone)
			// },


			// // 赋值和判断(姓名)
			// nameFun(e) {
			// 	this.setData({
			// 		name: e.detail.value.replace(/\s+/g, '')
			// 	});
			// 	this.checkName(this.data.name);
			// 	console.log(this.data.name)
			// },


			// // 日期组件
			// bindDateChange(e) {
			// 	console.log('picker发送选择改变，携带值为', e.detail.value)
			// 	this.setData({
			// 		date: e.detail.value
			// 	});
			// 	this.checkDate(this.data.date);
			// 	console.log(this.data.date)
			// },


			// // 会场组件
			// // https://www.jb51.net/article/157716.htm
			// bindHouseChange(e) {
			// 	console.log('picker发送选择改变，索引值为', e.detail.value)
			// 	console.log(e);
			// 	this.setData({
			// 		house: e.detail.value
			// 	});
			// 	this.checkHouse(this.data.house);

			// 	console.log(this.data.houseList2[this.data.house].name, "999")
			// },


			// // 赋值和判断(手机号)
			// remarkFun(e) {
			// 	this.setData({
			// 		remark: e.detail.value.replace(/\s+/g, '')
			// 	});
			// 	console.log(this.data.remark)
			// },

			// // 会场赋值
			activeVenueFun(index) {
				// this.setData({
				// 	house: e.currentTarget.dataset.index,
				// 	activeVenueShow: false,
				// });
				this.house = index;
				this.activeVenueShow = false;
				this.checkHouse(this.house);
			},

			// 显示会场弹层
			activeVenueShowFun() {
				this.applyListFun();
				// this.setData({
				// 	activeVenueShow: true,
				// });
				this.activeVenueShow = true;
			},


			cancel() {
				// this.setData({
				// 	activeVenueShow: false,
				// });

				this.activeVenueShow = false;
			},



			formSubmit() {

				this.checkPhoness(this.phone);
				this.checkName(this.name);
				this.checkHouse(this.house);
				console.log(this.phone, "this.data.phone")
				console.log(this.name, "this.data.name")
				console.log(this.house, "this.data.house")
				if (this.checkPhoness(this.phone) && this.checkName(this.name) && this.checkHouse(this.house)) {

					// (107)活动报名接口传参
					let name = this.name;
					let phone = this.phone;
					let participantstime = this.houseList2[this.house].starttime;
					let meetingplace = this.houseList2[this.house].id;
					let remark = this.remark;
					let createuserid = app.globalData.UserID;
					var wMsgID = desCode.wMsgID();
					var wParam = desCode.to3des(
						`name=${name}_phone=${phone}_participantstime=${participantstime}_meetingplace=${meetingplace}_remark=${remark}_createuserid=${createuserid}`
					);
					var md = mdCode.hexMD5('9999' + '107' + wMsgID + wParam + 'q1w2e3r4t5y6');
					const data = {
						wAgent: 9999,
						wAction: 107,
						wMsgID: wMsgID,
						wParam: wParam,
						wSign: md,
						wImei: 222,
						wVersion: 2,
						wRequestUserID: 4
					}
					api_js.postReq(data, (res) => {

						if (res.ReturnCode == 0) {

							console.log(res, "表单提交");

							let barcode = res.Data[0].barcodes[0].barcode;
							let barcodeimg = res.Data[0].barcodes[0].barcodeimg;
							let barstatus = res.Data[0].barcodes[0].barstatus;
							let name = res.Data[0].name;
							let meetingplace = res.Data[0].meetingplace;
							let participantstime = res.Data[0].participantstime.split(' ')[0];
							let logo = res.Data[0].logo;

							console.log(barcode, "barcode");
							console.log(barcodeimg, "barcodeimg");
							console.log(barstatus, "barstatus");
							console.log(name, "name");
							console.log(meetingplace, "meetingplace");
							console.log(participantstime, "participantstime");

							setTimeout(() => {

								uni.navigateTo({
									url: `../QRCode/QRCode?barcode=${barcode}&barcodeimg=${barcodeimg}&barstatus=${barstatus}&name=${name}&meetingplace=${meetingplace}&participantstime=${participantstime}&logo=${logo}`
								})

							}, 1000)
						} else if (res.ReturnCode == 401) {
							uni.showToast({
								title: '报名时间已过',
								icon: 'none',
								duration: 1500,
								mask: true,
							})
						} else if (res.ReturnCode == 400) {
							uni.showToast({
								title: '请不要重复报名哦！',
								icon: 'none',
								duration: 1500,
								mask: true,
							})
						}
					})

				} else {}


			},


			applyListFun() {

				let wMsgID = desCode.wMsgID();
				// let wParam = desCode.to3des();
				let wParam = '';
				let md = mdCode.hexMD5('8888' + '111' + wMsgID + wParam + 'q1w2e3r4t5y6');
				const data = {
					wAgent: 8888,
					wAction: 111,
					wMsgID: wMsgID,
					wParam: wParam,
					wSign: md,
					wImei: 222,
					wVersion: 2,
					wRequestUserID: 4
				}
				api_js.postReq(data, (res) => {

					console.log(res, "会场列表")

					if (res.ReturnCode == 0) {

						// this.setData({
						// 	houseList2: res.Data,
						// });

						this.houseList2 = res.Data;

						console.log(this.houseList2, "houseList2")


					}
				});


			},



		}
	}
</script>

<style lang="scss" scoped>
	@import 'apply.scss';
</style>
