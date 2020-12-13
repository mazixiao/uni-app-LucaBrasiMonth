<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<p>关于我</p>
		</view>

		<headers title="关于我们" :show_logo="true" :show_bol="true" :show_title="false" titleColor="#000" :GoBackWhite="false"></headers>


	</view>
</template>

<script>
	import headers from "../../components/headers.vue";
	export default {

		name: "about",
		components: {
			headers
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

		}
	}
</script>

<style lang="scss" scoped>
	@import 'about.scss';
</style>
