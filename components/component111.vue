<template name="component111">

	<view class='status-bar'>
		<view v-for="(user, index) in users" @click="change(user)" :key="index">{{user}}</view>
		<view>{{foo}}</view>
		<view>{{boo}}</view>
		<view>{{coo}}</view>
		<view>{{doo}}</view>
		<br>
		<component111Child :users1="users1" ref="component111Child">
			<template #didi>
				<view>插槽内容替代该组件里面的slot </view>
				<img src="https://t12.baidu.com/it/u=991376872,150399643&fm=30&app=106&f=JPEG?w=312&h=208&s=BFA0D903D2A95F052A20ED710300B0B3"
					alt="">
				<br>
				dididi: {{dididi}}
			</template>
		</component111Child>

		<br>
		<component111Child>
			<template v-slot:header>
				<view>我是插槽的头部</view>
			</template>
			<template v-slot:default>
				<view>我是插槽的内容</view>
				<view>我是插槽的内容</view>
			</template>
			<template v-slot:footer>
				<view>我是插槽的底部</view>
			</template>

		</component111Child>
	</view>


</template>

<script>
	import component111Child from "./component111Child.vue";
	export default {
		name: "component111",
		components: {
			component111Child,
		},
		data() {
			return {
				// type: "组件",
				// 获取手机状态栏高度
				bar_Height: wx.getSystemInfoSync().statusBarHeight,
				users1: 1000,
				dididi: 9566,
			};
		},



		props: { //此处定义传入的参数

			users: { // 设置标题
				type: Array,
				default: ''
			},
			foo: {
				type: String,
				default: ''
			},
			boo: {
				type: String,
				default: ''
			},

			coo: {
				type: String,
				default: ''
			},

			doo: {
				type: String,
				default: ''
			},


		},

		mounted() {
			const comA = this.$refs.component111Child;
			console.log(comA.title); // Vue.js
			comA.sayHello(); // 弹窗
		},
		methods: {
			change(user) {
				this.$emit("changeParent", user + 1)
			}
		},
		watch: {

		},
	}
</script>


<style>


</style>
