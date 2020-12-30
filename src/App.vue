<script>
	export default {
		globalData: {
			test: '000',
			isIphoneX: false,
		},


		onLaunch: function() {
			console.log('App Launch');
			//获取全局变量
			console.log(this.$options.globalData.test);

			wx.getSystemInfo({
				success: (res) => {
					if (-1 != res.model.search("iPhone X") || -1 != res.model.search("iPhone XS") || -1 != res.model.search(
							"iPhone XR") || -1 != res.model.search("iPhone XS Max")) {
						this.$options.globalData.isIphoneX = true;

					} else {
						this.$options.globalData.isIphoneX = false;
					}
					console.log(res)
				}
			})


		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.aa {
		width: 100%;
	}
</style>
