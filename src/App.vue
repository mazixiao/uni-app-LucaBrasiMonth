<script>
	// 1: 参会人员 2: 代理商 3: 代理商助理 4: 扫码人员
	const desCode = require('utils/aesUtil.js');
	const mdCode = require('utils/md5.js');
	const api_js = require("utils/api.js");
	const util_js = require("utils/util.js");



	export default {
		globalData: {
			test: '000',
			isIphoneX: false,
			openid: '',

			userInfo: null,
			UserName: '',
			UserID: '',
			Phone: '',
			// 身份 1:参会人员 2:扫码人员
			Status: 1,
			// 头像
			HeadPortrait: '',
			// 是否登录转态(默认没登录)
			LoginStatus: 1,

		},


		onLaunch: function() {
			console.log('App Launch');
			//获取全局变量
			// console.log(this.$options.globalData, "全局变量");

			wx.getSystemInfo({
				success: (res) => {
					if (-1 != res.model.search("iPhone X") || -1 != res.model.search("iPhone XS") || -1 != res.model.search(
							"iPhone XR") || -1 != res.model.search("iPhone XS Max")) {
						this.$options.globalData.isIphoneX = true;

					} else {
						this.$options.globalData.isIphoneX = false;
					}
					console.log(res)
				}
			});



			// 登录
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					var openid;
					var userid;
					var code = res.code;
					console.log(res, "登录的resresresres");
					console.log("小程序code " + code)
					var wMsgID = desCode.wMsgID();
					var wParam = desCode.to3des('code=' + code);
					var md = mdCode.hexMD5('9999' + '105' + wMsgID + wParam + 'q1w2e3r4t5y6');
					let data = {
						wAgent: 9999,
						wAction: 105,
						wMsgID: wMsgID,
						wParam: wParam,
						wSign: md,
						wImei: 222,
						wVersion: 2,
						wRequestUserID: 4
					}
					api_js.postReq(data, (res) => {
						console.log(res, "获取openid")

						// return;
						if (res.ReturnCode == 0) {
							var openid = res.Data[0].openid.replace(/_/g, "^=^")
							// var openid = "oGCIr43rhGgJFqA7MOqVhIb0FU$c"
							// console.log('自动登录 UserID =', UserID);
							var that = this;
							that.$options.globalData.openid = openid;
							console.log('获取到的 openid =', openid);
							// 获取登录状态
							var wMsgID = desCode.wMsgID();
							var wParam = desCode.to3des('openid=' + openid);
							var md = mdCode.hexMD5('9999' + '101' + wMsgID + wParam + 'q1w2e3r4t5y6');
							let data = {
								wAgent: 9999,
								wAction: 101,
								wMsgID: wMsgID,
								wParam: wParam,
								wSign: md,
								wImei: 222,
								wVersion: 2,
								wRequestUserID: 4
							}
							api_js.postReq(data, (res) => {
								console.log(res, "登录状态");
								// 登录状态 0：登录 1：过期
								// 没有注册的情况
								if (res.ReturnCode == 110) {
									this.$options.globalData.LoginStatus = 1;
									console.log(this.$options.globalData.LoginStatus, "this.globalData.LoginStatus")
								};

								if (res.Data) {
									if (res.Data[0].loginstatus == 0) {
										this.$options.globalData.LoginStatus = 0;
										this.$options.globalData.UserID = res.Data[0].userid;
										this.$options.globalData.Phone = res.Data[0].phone;
										this.$options.globalData.UserName = res.Data[0].nlikename;
										this.$options.globalData.HeadPortrait = res.Data[0].headportrait;
										this.$options.globalData.Status = res.Data[0].status;
										// this.$options.globalData.Status = 2;

										wx.setStorageSync("UserID", this.$options.globalData.UserID);
										if (this.$options.globalData.Status == 2) {
											console.log(2222)
											uni.reLaunch({
												url: '/pages/scanPeople/scanPeople'
											});
										} else {
											uni.reLaunch({
												url: '/pages/index/index'
											})
										}
									} else {
										this.$options.globalData.LoginStatus = 1;
									}
								}

							})
						}
					})
				}
			})




		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* vant */
	@import "/wxcomponents/vant/dist/common/index.wxss";
	.aa {
		width: 100%;
	}

	view,
	input {
		box-sizing: border-box
	}
</style>