<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<p>关于我</p>
		</view>

		<headers title="我的" :show_logo="true" :show_bol="true" :show_title="false" titleColor="#000" :GoBackWhite="false"></headers>
		<view class="aa" :style="{'padding-top': bar_Height + 45 + 'px','background':  '#ffffff'}"></view>

		<!-- 		<tabbar2 :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#42b983" @click="tabClick"></tabbar2> -->

		<tabbar navActive='1'></tabbar>
	</view>
</template>

<script>
	import headers from "../../components/headers.vue";
	import tabBar from '../../components/tabbar.vue';
	import tabbar2 from '../../components/tabbar2.vue';
	import tabbar from '../../components/tabbar.vue';
	export default {

		name: "my",
		components: {
			headers,
			tabbar2,
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
				title: 'Hello',
				// 当前tab高亮索引
				currentTabIndex: 1
			}
		},
		onLoad() {
			uni.hideTabBar({
				animation: false
			})
		},
		methods: {
			tabClick(index) {
				console.log('返回tabBar索引：' + index)
				this.currentTabIndex = index
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import 'my.scss';
</style>
