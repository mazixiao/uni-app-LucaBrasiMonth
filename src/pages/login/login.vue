<template>
	<view>


		<headers title="登录" :show_logo="true" :show_bol="false" :show_title="true" titleColor="#000" :GoBackWhite="false"></headers>





		<view class="content">
			<view class="login-text">
				<image style="" class="login-text" mode="" src='/static/images/login1.png'></image>
			</view>
			<view class="section">
				<form class='form' @submit="formSubmit">
					<view class="inputs">
						<view class="input-wrap">
							<input type="number" placeholder-style="color: #8f9198;" placeholder="请输入手机号" v-model.trim="phone" maxlength="11"
							 @input="checkPhoness2(phone)" />
							<image class="icon" mode="" src='/static/images/login-icon1.png'></image>
						</view>
						<view :class="['error', {'active': errorPhone}]">*请输入正确手机号</view>

						<view class="input-wrap">
							<input type="number" placeholder-style="color: #8f9198;" placeholder="请输入邀请码" v-model.trim='inviteCode' @input="checkInviteCode(inviteCode)"
							 maxlength="11" />
							<image class="icon" mode="" src='/static/images/login-icon2.png'></image>
						</view>
						<view :class="['error', {'active': errorInviteCode}]">*请输入正确邀请码</view>


						<view class="input-wrap">
							<input type="number" placeholder-style="color: #8f9198;" placeholder="请输入短信验证码" v-model.trim='noteCode' @input="checkNoteCode(noteCode)"
							 maxlength="6" />
							<image class="icon" mode="" src='/static/images/login-icon3.png'></image>

							<view :class="['send', {'active': get_code_color}]" @click="sendCodeFun">{{show_get_code}}</view>
							
							
<!-- 					 <view class="send {{get_code_color ? 'active' : ''}}" bindtap="sendCodeFun">{{show_get_code}}</view>	 -->	
							
						</view>

						<view :class="['error', {'active': errorNoteCode}]">*请输入正确验证码</view>
					</view>

					<button class="loginBtn" form-type="submit">登录</button>
				</form>
			</view>
			<view class="support">深圳银创网络科技提供技术支持</view>
		</view>


	</view>
</template>

<script>
	import headers from "../../components/headers.vue";


	const mdCode = require('../../utils/md5.js');
	const desCode = require('../../utils/aesUtil.js');
	const api_js = require("../../utils/api.js");
	let App = getApp()
	export default {
		name: "login",
		components: {
			headers,
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
				// 手机号
				phone: "",
				// 邀请码
				inviteCode: "438633",
				// 438633
				// 短信验证码
				noteCode: "",
				errorPhone: false,
				errorInviteCode: false,
				errorNoteCode: false,
				sendCode: "发送",
				//是否能点击获取验证码的状态判断
				get_code_status: true,
				get_code_color: false,
				show_get_code: '发送',
				get_code_time: 60,
				disalog: "none",
				flag: '',
				openid: '',
				avatarUrl: '',
				isShare: 0,

			}
		},
		onLoad() {
			// uni.hideTabBar({
			// 	animation: false
			// })
		},
		methods: {





			// 号码验证(手机)
			checkPhoness(phone) {

				if (!/^1[34578]\d{9}$/.test(phone)) {

					this.errorPhone = true;
					return false;
				} else {
					this.errorPhone = false;
					return true;
				}
			},


			checkPhoness2(phone) {

				if (!/^1[34578]\d{9}$/.test(phone)) {

					if (phone.length == 0 || phone.length == 11) {
						this.errorPhone = true;
						return false;
					}

				} else {
					this.errorPhone = false;
					return true;
				}
			},



			// 邀请码验证
			checkInviteCode(value) {
				if (value == '') {
					this.errorInviteCode = true;
					return false;
				} else {
					this.errorInviteCode = false;
					return true;
				}
			},

			// 短信验证
			checkNoteCode(value) {
				if (value == '') {
					this.errorNoteCode = true;
					return false;
				} else {
					this.errorNoteCode = false;
					return true;
				}
			},



			// 发送短信验证码
			sendCodeFun() {
				var phone = this.phone;
				var wMsgID = desCode.wMsgID();
				if (this.checkPhoness(phone)) {
					if (this.get_code_status) {

						var that = this;
						var wParam = desCode.to3des('phone=' + phone);
						var md = mdCode.hexMD5('9999' + '103' + wMsgID + wParam + 'q1w2e3r4t5y6');
						const data = {
							wAgent: 9999,
							wAction: 103,
							wMsgID: wMsgID,
							wParam: wParam,
							wSign: md,
							wImei: 222,
							wVersion: 2,
							wRequestUserID: 4
						}
						api_js.postReq(data, (res) => {
							console.log(res, "验证码");
							// if (res.ReturnCode == 204) {
							//   wx.showToast({
							//     title: '手机号格式不正确',
							//     icon: 'none',
							//     duration: 3000
							//   })
							// }
							// 已发送50s
							if (res.ReturnCode == 0) {
								// that.setData({
								// 	show_get_code: '已发送' + (that.get_code_time) + 's',
								// 	get_code_color: true,
								// 	get_code_status: false
								// });
								
								that.show_get_code = '已发送' + (that.get_code_time) + 's';
								that.get_code_color = true;
								that.get_code_status = false;

								var timer = setInterval(function() {
									if (that.get_code_time > 0) {
										// that.setData({
										// 	get_code_time: that.data.get_code_time - 1,
										// 	show_get_code: '已发送' + (that.data.get_code_time - 1) + 's',
										// 	get_code_color: true,
										// 	get_code_status: false
										// });
										
										that.get_code_time = that.get_code_time - 1;
										that.show_get_code = '已发送' + (that.get_code_time - 1) + 's';
										that.get_code_color = true;
										that.get_code_status = false;
										
									} else {
										clearInterval(timer);
										// that.setData({
										// 	get_code_time: 60,
										// 	show_get_code: '重新发送',
										// 	get_code_color: false,
										// 	get_code_status: true
										// });
										
										that.get_code_time = 60;
										that.show_get_code = '重新发送';
										that.get_code_color = false;
										that.get_code_status = true;
									}
								}, 1000);
							}

							// that.setData({
							// 	// login_code: res.data.data.code //后台返回的验证码，可以做判断用
							// });

						})
					}

				}


			},



			// 表单
			formSubmit() {
				var that = this;



				this.checkPhoness(this.phone);
				this.checkInviteCode(this.inviteCode);
				this.checkNoteCode(this.noteCode);

				if (this.checkPhoness(this.phone) && this.checkInviteCode(this.inviteCode) && this.checkNoteCode(this.noteCode)) {

					console.log(this.phone);
					console.log(this.inviteCode);
					console.log(this.noteCode);

					// 邀请码 438633


					// return
					//   入参：
					//   phone ///手机号
					// invitationcode ///邀请码
					// code ///短信验证码
					// openid ///openid


					// app.globalData.LoginStatus

					var wMsgID = desCode.wMsgID();
					// console.log('_openid', that.data.openid);
					var wParam = desCode.to3des(
						`phone=${that.phone}_invitationcode=${that.inviteCode}_code=${that.noteCode}_openid=${App.globalData.openid}`
					);
					var md = mdCode.hexMD5('9999' + '102' + wMsgID + wParam + 'q1w2e3r4t5y6');
					const data = {
						wAgent: 9999,
						wAction: 102,
						wMsgID: wMsgID,
						wParam: wParam,
						wSign: md,
						wImei: 222,
						wVersion: 2,
						wRequestUserID: 4
					}
					api_js.postReq(data, (res) => {


						if (res.ReturnCode == 202) {
							wx.showToast({
								title: '邀请码不正确',
								icon: 'none',
								duration: 2000,
								mask: true,
							})
						}
						if (res.ReturnCode == 203) {
							wx.showToast({
								title: '验证码不正确',
								icon: 'none',
								duration: 2000,
								mask: true,
							})
						}

						if (res.ReturnCode == 0) {


							console.log(res, "登录转态");

							// 1:参会人员 2:扫码人员
							// app.globalData.LoginStatus = res.Data[0].loginstatus;
							console.log(App.globalData.LoginStatus, "App.globalData.LoginStatus");

							App.globalData.LoginStatus = res.Data[0].loginstatus;
							App.globalData.UserID = res.Data[0].id;
							App.globalData.Phone = res.Data[0].phone;
							App.globalData.UserName = res.Data[0].nlikename;
							App.globalData.HeadPortrait = res.Data[0].headportrait;
							App.globalData.Status = res.Data[0].status;

							wx.setStorageSync("UserID", res.Data[0].id);


							if (App.globalData.Status == 2) {
								uni.reLaunch({
									url: '../../pages/scanPeople/scanPeople'
								})
							} else {
								uni.reLaunch({
									url: '../../pages/index/index'
								})
							}

						}
					})



				}


			},

		}
	}
</script>

<style lang="scss" scoped>
	@import 'login.scss';
</style>
