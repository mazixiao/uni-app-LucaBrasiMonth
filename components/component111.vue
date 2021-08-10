<template name="component111">

	<view class='status-bar'>
		<view v-for="(user, index) in users" @click="change(user)" :key="index">{{user}}</view>
	</view>


</template>

<script>
	export default {
		name: "component111",
		data() {
			return {
				// type: "组件",
				// 获取手机状态栏高度
				bar_Height: wx.getSystemInfoSync().statusBarHeight,
				// bar_Height: 100,
			};
		},



		props: { //此处定义传入的参数

			users: { // 设置标题
				type: Array,
				default: ''
			},

		},
		watch: {

		},
		methods: {
			
			change(user) {
				this.$emit("changeParent", user + 1)
			}



		}
	}
</script>


<style>


</style>
