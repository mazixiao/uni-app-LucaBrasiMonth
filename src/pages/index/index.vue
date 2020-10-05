<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<p>测试代码</p>


			<view @click="goabout">
				<view class="uni-link-item">跳转到about页面</view>
			</view>

			<button type="primary">页面主操作 Normal</button>


			<view>
				<view class="uni-padding-wrap uni-common-mt">
					<view class="uni-title">默认样式</view>
					<view>
						<switch checked @change="switch1Change" />
						<switch @change="switch2Change" />
					</view>
					<view class="uni-title">推荐展示样式</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell uni-list-cell-pd">
						<view class="uni-list-cell-db">开启中</view>
						<switch checked />
					</view>
					<view class="uni-list-cell uni-list-cell-pd">
						<view class="uni-list-cell-db">关闭</view>
						<switch />
					</view>
				</view>
			</view>





			<!-- <van-button type="success">主要按钮</van-button> -->
		</view>
	</view>
</template>

<script>
	// import { Button, Tab, Tabs, List, Cell, Loading, Swipe, SwipeItem } from "vant";
	export default {
		name: "index",
		components: {
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
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function (e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},

			goabout(e) {
				// alert(11)
				uni.switchTab({
					url: '../about/about'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'index.scss';
</style>