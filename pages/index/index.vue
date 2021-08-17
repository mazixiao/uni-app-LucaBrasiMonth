<template>
	<view class="content">

		<headers title="YUANYUE" :show_logo="true" :show_bol="true" :show_title="false" backgroundColor="#fff">
		</headers>
		<view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  '#ffffff'}"></view>
		<tabbar navActive='0'></tabbar>
		<image class="indexImg1" mode="" src='/static/images/index1.png'></image>
		<view class="link-wrap">
			<view class="item" @click="openLoginFun">
				<image class="bg" mode="" src='/static/images/index2.png'></image>
				<view class="item-con">
					<image class="icon" mode="" src='/static/images/index3.png'></image>
					<view class="cn">活动报名</view>
					<view class="en">EVENT REGISTRATION</view>
				</view>
			</view>
			<view class="item" @click="openLoginFun2">
				<image class="bg" mode="" src='/static/images/index4.png'></image>
				<view class="item-con">
					<image class="icon" mode="" src='/static/images/index5.png'></image>
					<view class="cn">报名记录</view>
					<view class="en">REGISTRATION RECORD</view>
				</view>
			</view>
		</view>
		<view class="isLogin" v-if="isLogin">
			<view class="isLogin-con">
				<image class="closes" @click="closeLoginFun" mode="" src='/static/images/close.png'></image>
				<view class="login-text">
					<view class="cn">请先去登录</view>
					<view class="en">PLEASE LOG IN FIRST</view>
				</view>
				<view class="button-wrap">
					<view class="button" @click="closeLoginFun">取消</view>
					<view class="button goLogin" @click="goLoginFun">去登录</view>
				</view>
			</view>
		</view>
		<van-toast id="van-toast" />
		<van-button type="primary" @click="showToast">测试vant轻提示和测试防止重复提交</van-button>

		<navigator url="/packageA/pages/test/test" hover-class="navigator-hover">跳转到分包页面</navigator>
		{{hasLogin}}
		<br>
		{{getStateCount1}}
		<br>
		{{doneTodosCount.a}}
		<br>
		vuex配合本地存储:<input type="text" v-model="message">
		<br>
		prop组件传值(父组件向子组件传值):
		<component111 :users="users" v-on:changeParent="changeChildren"></component111>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from "vuex";
	import headers from "../../components/headers.vue";


	import tabbar from '../../components/tabbar.vue';
	import Toast from '../../wxcomponents/vant/dist/toast/toast';

	import component111 from "../../components/component111.vue";


	const mdCode = require('../../utils/md5.js');
	const desCode = require('../../utils/aesUtil.js');
	const api_js = require("../../utils/api.js");
	let App = getApp()
	export default {
		name: "index",
		components: {
			headers,
			tabbar,
			component111,
			// 当前tab高亮索引
		},

		data() {
			return {
				currentTabIndex: 0,
				bar_Height: wx.getSystemInfoSync().statusBarHeight,
				userInfo: {},
				hasUserInfo: false,
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				isIphoneX_: App.globalData.isIphoneX,
				// 是否登录
				isLogin: false,

				users: [1, 2, 3, 4],

				isclick: true,
				
				add: 10,

			}
		},

		computed: {
			...mapState(['userInfo1', 'hasLogin']),
			...mapGetters(["getStateCount1", "doneTodosCount"]),
			message: {
				// 得到vuex中的初始值
				get() {
					console.log(this.$store.state.message, "this.$store.state.message");
					return this.$store.state.message
				},
				// 设置值
				set(value) {
					console.log(value, "input的value")
					this.$store.commit('updateMessage', value.toUpperCase())
				}
			}
		},


		onLoad() {



			//获取全局变量
			console.log(App.globalData.test);
			console.log(App.globalData.isIphoneX);

			uni.hideTabBar({
				animation: false
			});

			this.isLoginFun();

			// 更改顶部文字颜色
			// uni.setNavigationBarColor({
			// 	frontColor: "#ffffff",	//文字颜色
			// 	backgroundColor: "#007AFF"	//底部背景色
			// })

			try {
				console.log(new Date())
			} catch (e) {
				// console.log(err, "err");
				console.log(e.toLocaleString())
			}



			this.parentFun();


		},
		methods: {
			...mapMutations(['login']),

			// 防止重复提交
			showToast() {
				if (this.isclick) {
					Toast('测试防止重复提交');
					let that = this;
					this.isclick = false;
					// console.log(this.isclick, "this.isclick");
					// setTimeout(function() {
					// 	that.isclick = true;
					// }, 6000)

					this.getAlbum(0, 21);
				}
			},

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
					console.log(res, "108列表数据");
					// that.isclick = true;
					
					setTimeout(function() {
						that.isclick = true;
					}, 6000)
					
				})
			},




			isLoginFun() {
				//调用 ...mapMutations(['addNum', "count2Fun"])里的方法
				// 意思是把 mutations 的方法 写到你当前组件的this中，你在组件内就可以直接通过 this.xxx 来找到这个Mutation方法
				this.login();
			},


			tabClick(index) {
				console.log('返回tabBar索引：' + index)
				this.currentTabIndex = index
			},
			openLoginFun() {
				if (App.globalData.LoginStatus == 1) {
					this.isLogin = true;
				} else {
					this.closeLoginFun();
					uni.navigateTo({
						url: '../apply/apply'
					})
				}
			},

			openLoginFun2() {
				if (App.globalData.LoginStatus == 1) {
					this.isLogin = true;
				} else {
					this.closeLoginFun();
					uni.navigateTo({
						url: '../applyList/applyList'
					})
				}
			},

			closeLoginFun() {
				this.isLogin = false;
			},

			goLoginFun() {
				this.closeLoginFun();
				uni.navigateTo({
					url: '../login/login'
				})
			},

			changeChildren(e) {
				console.log(e, "eee");
				this.users.push(e)
			},
			
			parentFun() {
				this.add = this.add + 10;
				console.log(this.add)
			}

		},



		onHide() {
			this.closeLoginFun();
		},


		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {
			return {
				title: '媛月幸福汇',
				path: '/pages/index/index?isShare=1',
				imageUrl: '/images/DefaultAvatar.png',
			}
		},

	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';
</style>




<!-- 21         onLoad() {
22             console.log('页面加载')
23         },
24         onShow() {
25             console.log('页面显示')
26         },
27         onReady(){
28             console.log('页面初次显示')
29         },
30         onHide() {
31             console.log('页面隐藏')
32         },
33         onUnload() {
34             console.log('页面卸载')
35         },
36         onBackPress(){
37             console.log('页面返回...')
38         },
39         onShareAppMessage() {
40             console.log('分享!')
41         },
42         onReachBottom() {
43             console.log('下拉加载...')
44         },
45         onPageScroll(){
46             console.log('页面滚动...')
47         },
48         onPullDownRefresh() {
49             console.log('上拉刷新...')
50             uni.stopPullDownRefresh();
51         }, -->
