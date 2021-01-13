<template>
	<view>


		<headers title="我的" :show_logo="true" :show_bol="true" :show_title="false" titleColor="#fff" :GoBackWhite="false"></headers>
		<tabbar navActive='1'></tabbar>
		<view :class="['content', {'isIphoneX_': isIphoneX_}]">
			<view class="my-top">
				<image class="applyImg" mode="" src='/static/images/my1.png'></image>
				<!-- 未登录 -->
				<button class="introduct" v-if="!headportrait" open-type="getUserInfo" @getuserinfo="bindGetUserInfo"
				 withCredentials="true">
					<image class="myImg" mode="" src='/static/images/DefaultAvatar.png'></image>
					<view class="text">点击获取头像</view>
				</button>
				<!-- 已经登录 -->
				<view class="introduct" v-if="headportrait">
					<image class="myImg" mode="" :src='headportrait'></image>
					<view class="text">{{nickName}}</view>
				</view>
			</view>
			<view :class="['btns', {'active': status == 2}]">
				<view class="btn1" v-if="status == 1" @click="checkStateFun">查看签到状态</view>
				<view :class="['btn2', {'exit': exit}]" v-if="exit" @click="exitLoginFun">退出登录</view>
				<view :class="['btn2', {'exit': exit}]" v-else @click="LoginFun">登录</view>

			</view>
			<view class="isLogin" v-if="isExit">
				<view class="isLogin-con">
					<image class="closes" @click="noExitFun" mode="" src='/static/images/close.png'></image>
					<view class="login-text">
						<view class="cn">确定要退出登录吗？</view>
						<view class="en">ARE YOU SURE YOU WANT TO LOG OUT</view>
					</view>
					<view class="button-wrap">
						<view class="button" @click="okExitFun">确定</view>
						<view class="button goLogin" @click="noExitFun">取消</view>
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

		name: "my",
		components: {
			headers,
			tabbar
		},

		data() {
			return {
				title: 'Hello',
				// 当前tab高亮索引
				currentTabIndex: 1,
				bar_Height: wx.getSystemInfoSync().statusBarHeight,
				isIphoneX_: App.globalData.isIphoneX,
				// 退出登录
				exit: false,
				// 是否退出弹层
				isExit: false,
				// 姓名
				nickName: "",
				// 头像
				headportrait: "",
				// 身份
				status: 1,
			}
		},
		onLoad() {
			uni.hideTabBar({
				animation: false
			});

			if (App.globalData.LoginStatus == 0) {
				this.exit = true;
				this.nickName = App.globalData.UserName;
				this.headportrait = App.globalData.HeadPortrait;
				this.status = App.globalData.Status;
			} else {
				this.exit = false;
			};

		},
		methods: {
			// 点击退出登录
			exitLoginFun() {
				this.isExit = true;
			},

			// 点击登录
			LoginFun() {
				uni.navigateTo({
					url: '../login/login'
				})
			},

			// 取消退出
			noExitFun() {
				this.isExit = false;
			},

			// 确认退出
			okExitFun() {
				this.isExit = false;
				var wMsgID = desCode.wMsgID();
				var wParam = desCode.to3des(`userid=${App.globalData.UserID}`);
				var md = mdCode.hexMD5('9999' + '104' + wMsgID + wParam + 'q1w2e3r4t5y6');
				const data = {
					wAgent: 9999,
					wAction: 104,
					wMsgID: wMsgID,
					wParam: wParam,
					wSign: md,
					wImei: 222,
					wVersion: 2,
					wRequestUserID: 4
				}
				api_js.postReq(data, (res) => {
					console.log(res, "退出登录")
					if (res.ReturnCode == 0) {
						App.globalData.LoginStatus = 1;
						App.globalData.UserID = '';
						App.globalData.Phone = '';
						App.globalData.UserName = '';
						App.globalData.HeadPortrait = '';
						App.globalData.Status = 1;
						wx.removeStorageSync('UserID')
						this.exit = false;
						uni.reLaunch({
							url: '../index/index'
						})
						wx.showToast({
							title: '退出成功',
							icon: 'none',
							duration: 1500,
							mask: true,
						})
					}
				})
			},

			// 查看签到状态
			checkStateFun() {
				console.log(22);
				console.log(App.globalData.LoginStatus);
				if (App.globalData.LoginStatus == 1) {
					wx.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 2000,
						mask: true,
					})
					return;
				}

				uni.navigateTo({
					url: '../checkState/checkState'
				})
			},





			ifNetwork() {
				wx.getNetworkType({
					success: function(res) {
						if (res.networkType == 'none') {
							wx.showModal({
								title: '网络错误',
								content: '网络出错，请刷新重试',
								showCancel: false
							});
						}
					}
				})
			},


			// 授权
			bindGetUserInfo(e) {
				console.log(111666)
				if (App.globalData.LoginStatus == 1) {
					wx.showToast({
						title: '请先登录',
						icon: 'none',
						duration: 2000,
						mask: true,
					})
					return;
				} else {
					if (e.detail.rawData) {
						//用户按了允许授权按钮
						console.log(e.detail, "e.detail")


						//   入参：
						//   userid ///用户id
						// phone ///手机号码
						// openid ///openid
						// nlikename ///昵称
						// headportrait ///头像
						// gender ///性别

						let userid = App.globalData.UserID;
						let phone = App.globalData.Phone;
						let openid = App.globalData.openid;
						let nickName = e.detail.userInfo.nickName.replace(/_/g, "^=^");
						let headportrait = e.detail.userInfo.avatarUrl.replace(/_/g, "^=^");
						let gender = e.detail.userInfo.gender;

						console.log(userid, "userid");
						console.log(phone, "phone");
						console.log(openid, "openid");
						console.log(nickName, "nickName");
						console.log(headportrait, "headportrait");
						console.log(gender, "gender");
						var wMsgID = desCode.wMsgID();
						var wParam = desCode.to3des(
							`userid=${userid}_phone=${phone}_openid=${openid}_nlikename=${nickName}_headportrait=${headportrait}_gender=${gender}`
						);
						var md = mdCode.hexMD5('9999' + '113' + wMsgID + wParam + 'q1w2e3r4t5y6');
						const data = {
							wAgent: 9999,
							wAction: 113,
							wMsgID: wMsgID,
							wParam: wParam,
							wSign: md,
							wImei: 222,
							wVersion: 2,
							wRequestUserID: 4
						}
						api_js.postReq(data, (res) => {
							console.log(App.globalData.UserID, "app.globalData.UserID");
							console.log(App.globalData.LoginStatus, "this.globalData.LoginStatus");
							console.log(App.globalData.Phone, "app.globalData.Phone");
							console.log(App.globalData.UserName, "app.globalData.UserName");
							console.log(App.globalData.HeadPortrait, "app.globalData.HeadPortrait");
							console.log(res, "点击登录");
							// 106接口
							// userid
							var wMsgID = desCode.wMsgID();
							var wParam = desCode.to3des(`userid=${App.globalData.UserID}`);
							var md = mdCode.hexMD5('9999' + '106' + wMsgID + wParam + 'q1w2e3r4t5y6');
							const data = {
								wAgent: 9999,
								wAction: 106,
								wMsgID: wMsgID,
								wParam: wParam,
								wSign: md,
								wImei: 222,
								wVersion: 2,
								wRequestUserID: 4
							}
							api_js.postReq(data, (res) => {
								console.log(res, "我的个人中心");
								App.globalData.UserName = res.Data[0].nlikename;
								App.globalData.HeadPortrait = res.Data[0].headportrait;
								this.nickName = App.globalData.UserName;
								this.headPortrait = App.globalData.HeadPortrait;
							})
						})

					} else {
						//用户按了拒绝按钮
						console.log("被拒绝")
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'my.scss';
</style>
