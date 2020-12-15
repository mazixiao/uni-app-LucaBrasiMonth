<template>

	<view>


<!-- 		<view class="tab-bar" style="color: {{tabBar.color}}; background: {{tarBar.backgroundColor}};bottom: 0;height:{{tabBar.isIphoneX ? '83px' : '49px'}};">
			<view class="tabbarItmeBg">
				<block wx:for="{{tabBar.list}}" wx:key="pagePath">
					<navigator url="{{item.pagePath}}" open-type="redirect" class="menu-item" hover-class="none" style="margin-top: {{tabBar.isIphoneX ? '4px' : '0px'}};{{ item.active? 'color: '+(item.selectedColor? item.selectedColor : tabBar.selectedColor) : ''}}">
						<view class="tabImage">
							<image class="tabbarIcon" src="{{item.selectedIconPath}}" wx:if="{{item.active}}"></image>
							<image class="tabbarIcon" src="{{item.iconPath}}" wx:if="{{!item.active}}"></image>
						</view>
						<text class="tabbarTitle">{{item.text}}</text>
					</navigator>
				</block>
			</view>
		</view> -->
		
		<view class="tab-bar">
			<block v-for="(item, index) in tabBar.list" :key="item.pagePath">
				<navigator :class="{'active': fullPath == item.pagePath}" :url="item.pagePath" open-type="switchTab" > 
					{{item.text}}
				</navigator>
			</block>
		</view>



	</view>



</template>

<script>
	export default {
		name: "tabbar2",
		data() {
			return {
				fullPath: '',
				// 普通用户
				tabBar: {
					"color": "#8f9198",
					"selectedColor": "#9c528a",
					"backgroundColor": "#fff",
					"borderStyle": "#eee",
					list: [{
							"pagePath": "pages/index/index",
							"text": "首页",
							"iconPath": "../static/images/link-icon1.png",
							"selectedIconPath": "../static/images/link-icon1-hover.png",
							"clas": "menu-item",
							// "active": true
						},
						{
							"pagePath": "/pages/my/my",
							"text": "我的",
							"iconPath": "../static/images/link-icon2.png",
							"selectedIconPath": "../static/images/link-icon2-hover.png",
							"clas": "menu-item",
							// "active": false
						}
					],
					"position": "bottom",
					"isIphoneX": false
				},

			}
		},
		props: {
			current: {
				type: [Number, String],
				default: 0
			},
			backgroundColor: {
				type: String,
				default: '#fbfbfb'
			},
			color: {
				type: String,
				default: '#999'
			},
			tintColor: {
				type: String,
				default: 'yellow'
			}
		},
		methods: {
			switchTab(index) {
				this.currentTabIndex = index
				this.$emit('click', index)
			}
		},
		onLoad() {
			// console.log(this)
			var _curPageArr = getCurrentPages();
			this.fullPath = _curPageArr.[0].$page.fullPath;
			
						console.log(_curPageArr.[0].$page.fullPath);
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		navigator {
			&.active {
				background-color: red;
			}
		}
	}
</style>
