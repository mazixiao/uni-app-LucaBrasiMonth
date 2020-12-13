<template name="headers">

	<view class='status-bar' :style="{'backgroundColor': backgroundColor,height: (bar_Height + 44) + 'px'}">

		<view class="tabar" :style="{'padding-top': bar_Height + 'px'}" v-show="!show_title">
			<view class="textView">
				<text :style="{'color': titleColor}">{{title}}</text>
			</view>
		</view>

		<view class="tabar" :style="{'padding-top':bar_Height + 'px'}" v-show="!show_bol">
			<view class='GoBack' @click='goBack' v-if="!GoBackWhite">
				<image src='../static/images/back.png' style='width:22rpx;height:36rpx;'></image>
			</view>
			<view :class="['GoBack',{'GoBackWhite': GoBackWhite}]" @click='goBack' v-if='GoBackWhite'>
				<image src='../static/images/back2.png' style='width:22rpx;height:36rpx;'></image>
			</view>
			<view class="textView">
				<text :style="{'color': titleColor}">{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "headers",
		data() {
			return {
				// type: "组件",
				// 获取手机状态栏高度
				bar_Height: wx.getSystemInfoSync().statusBarHeight,	
				// bar_Height: 100,
			};
		},
		
		
		  // props: {
		  //   duration: {
		  //      type: Number,
		  //      default: 3,
		  //   }
		  // }
		
		
		
		props: { //此处定义传入的参数


			title: { // 设置标题
				type: String,
				default: ''
			},
			show_bol: { // 控制返回箭头是否显示
				type: Boolean,
				default: false
			},
			show_logo: {
				type: Boolean,
				default: false
			},
			show_title: {
				type: Boolean,
				default: false
			},
			myClass: { // 控制样式
				type: Boolean,
				default: false
			},
			showSearch: {
				type: Boolean,
				default: false
			},

			backgroundColor: {
				type: String,
				default: 'transparent'
			},

			titleColor: {
				type: String,
				default: ''
			},
			GoBackWhite: {
				type: Boolean,
				default: false
			}






		},
		watch: {
			isShow(param) {
				if (param) {
					this.isShowModal = true;
				} else {
					this.isShowModal = false;
				}
			},
			param(param) {
				if (param) {
					var token_1 = param[0].token; //机构ID
					this.getSClassList(token_1); //页面一打开，就加载数据
				}
			}
		},
		methods: {


			goBack: function() { // 返回事件
				wx.navigateBack({
					delta: 1,
				})
			},
			goSearch: function() {
				wx.navigateTo({
					url: '../search/search', //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
				})
			}


		}
	}
</script>


<style>
	
	/* 顶部导航 */
	
	.status-bar {
	  width: 100%;
	  z-index: 15;
	  position: fixed;
	  top: 0;
	  left: 0;
	  display: flex;
	  align-items: center;
	  background: transparent;
	  height: 65px;
	}
	
	.tabar {
	  width: 100%;
	  color: #000;
	  text-align: center;
	  height: 44px;
	  position: relative;
	  box-sizing: content-box;
	}
	
	
	.textView {
	  height: 44px;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.tabar text {
	  color: #000;
	  font-size: 34rpx;
	  font-family: PingFangSC, PingFangSC-Medium;
	  font-weight: 500;
	}
	.goBack {
	  position: absolute;
	  bottom: 0;
	  left: 20rpx;
	  width: 134rpx;
	  height: 64rpx;
	  background: rgba(255, 255, 255, 0.6);
	  border-radius: 32rpx;
	  border: 1rpx solid rgba(0, 0, 0, 0.08);
	  display: flex;
	  align-items: center;
	  justify-content: space-around;
	  padding: 0 20rpx;
	}
	
	
	
	.GoBack {
	  position: absolute;
	  bottom: 0;
	  left: 12rpx;
	  width: 134rpx;
	  height: 44px;
	  /* background: rgba(255, 255, 255, 0.6); */
	  border-radius: 32rpx;
	  text-align: left;
	  padding: 0 20rpx;
	  display: flex;
	  align-items: center;
	  /* justify-content: center; */
	}
	
	.GoBack.GoBackWhite {
	  background: transparent;
	}
	
	
	.xian {
	  width: 2rpx;
	  height: 37rpx;
	  background: rgba(0, 0, 0, 1);
	  opacity: 0.2;
	}

	
	
</style>
