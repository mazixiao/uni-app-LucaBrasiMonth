<template name="component111Child">

	<view class='status-bar'>
		我是component111Child组件
		<br>
		<button type="submit">
			<slot name="didi"></slot>
		</button>


		<header>
			<!-- 我们希望把页头放这里 -->
			<slot name="header"></slot>
		</header>
		<main>
			<!-- 我们希望把主要内容放这里 -->
			<slot :user="user">{{user.lastName}}</slot>
		</main>
		<footer>
			<!-- 我们希望把页脚放这里 -->
			<slot name="footer"></slot>
		</footer>


	</view>




</template>

<script>
	export default {
		name: "component111Child",

		created() {
			console.log(this.$attrs); // age, infoObj, height 
			console.log(this.$listeners) // updateInfo: f, delInfo: f, addInfo: f  
		},

		data() {
			return {
				// type: "组件",
				// 获取手机状态栏高度
				bar_Height: wx.getSystemInfoSync().statusBarHeight,
				title: "父组件通过ref拿到子组件的值和方法",
				user: {
					"lastName": "bar",
					"firstName": "foo"
				}

			};
		},
		watch: {

		},
		methods: {
			sayHello() {
				console.log('Hello_父组件通过ref拿到子组件的值和方法');
			}

		}
	}
</script>


<style>


</style>
