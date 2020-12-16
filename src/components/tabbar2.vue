<template>
	<view class="tab-bar-container">

		<block v-for="(item,index) in tabList" :key="index">
			<navigator class="navigator" :url="item.pagePath" open-type="switchTab" :class="currentTabIndex == index ? 'on' : ''" @click="switchTab(index)">
				<view class="icon">
					<text class="iconfont" :class="item.icon" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]"></text>
				</view>
				<view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">{{item.text}}</view>
			</navigator>
		</block>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [
					{
						icon: 'icon-emotion',
						text: '首页',
						"pagePath": "../index/index",
					},
					{
						icon: 'icon-qianbao',
						text: '我的',
						"pagePath": "../my/my",
					}
				],
				currentTabIndex: this.current
			}
		},
		props: {
			current: { type: [Number, String], default: 0 },
			backgroundColor: { type: String, default: '#fbfbfb' },
			color: { type: String, default: '#999' },
			tintColor: { type: String, default: '#42b983' }
		},
		methods: {
			switchTab(index){
				this.currentTabIndex = index;
				// console.log(this.tabList[index].pagePath)
				// uni.switchTab({
				// 	url: this.tabList[index].pagePath
				// })
				this.$emit('click', index);
				
				console.log(index, "index");
			}
		},
	}
</script>

<style scoped lang="scss">
	.tab-bar-container {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		width: 100%;
		height: 50px;
		box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 50rpx;
		box-sizing: border-box;
		background-color: #fff;


		.navigator {
			height: 100%;
			width: 80rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;

			.icon-style {
				font-size: 20px;
			}

			/* 选中图标的高亮样式 */
			.height-light {
				background: linear-gradient(137deg, #507EFF 26%, #2A56F7 71%, #193EEE 100%);
				-webkit-background-clip: text;
				color: transparent;
			}

			.text {
				font-size: 24rpx;
			}

			.num-badge {
				position: absolute;
				top: 0;
				right: -26rpx;
			}
		}
	}
</style>
